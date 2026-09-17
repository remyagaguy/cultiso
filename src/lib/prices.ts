import prixData from "@/data/prix_extraits_togo.json";

export async function getPriceContext(supabase: any, message: string, combinedQuery: string): Promise<string> {
  let dbPriceContext = "";
  let jsonPriceContext = "";
  
  try {
    const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedQuery = removeAccents(combinedQuery);
    
    // 1. Filtrage sur la Base de Données (RPC Native Jointure)
    const { data: matchedPrices, error } = await supabase.rpc('search_market_prices', {
      search_term: normalizedQuery
    });

    if (matchedPrices && matchedPrices.length > 0) {
      matchedPrices.forEach((pr: any) => {
         dbPriceContext += `- ${pr.product_name}: ${pr.price} ${pr.currency} / ${pr.unit || pr.product_default_unit} (Lieu: ${pr.location || 'Non précisé'}, Date: ${pr.record_date})\n`;
      });
    }

    // 2. Filtrage sur le fichier JSON
    if (prixData && prixData.length > 0) {
      const matchedJsonData = prixData.filter((item: any) => 
        normalizedQuery.includes(removeAccents(item.produit || "")) || 
        (item.produit && removeAccents(item.produit).includes(normalizedQuery))
      ).slice(0, 15);
      
      if (matchedJsonData.length > 0) {
        jsonPriceContext = matchedJsonData
          .map((item: any) => `- ${item.produit} : ${item.prix || "Non précisé"} (Vendeur: ${item.vendeur}, Date: ${item.date})`)
          .join("\n");
      }
    }
  } catch (err) {
     console.error("Price fetch error:", err);
  }

  if (dbPriceContext || jsonPriceContext) {
    return `\n\nDONNÉES DE PRIX DU MARCHÉ (BASE DE DONNÉES) :\n${dbPriceContext || "Aucune donnée DB"}\n\nAUTRES PRIX (WHATSAPP) :\n${jsonPriceContext || "Aucune donnée WhatsApp"}`;
  }
  
  return "";
}
