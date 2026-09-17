import prixData from "@/data/prix_extraits_togo.json";

export async function getPriceContext(supabase: any, message: string, combinedQuery: string): Promise<string> {
  const isPriceQuery = message.toLowerCase().includes("prix") || 
                       message.toLowerCase().includes("coût") || 
                       message.toLowerCase().includes("coute") || 
                       message.toLowerCase().includes("combien");
                       
  if (!isPriceQuery) {
    return "";
  }

  let dbPriceContext = "";
  let jsonPriceContext = "";
  
  try {
    const removeAccents = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedQuery = removeAccents(combinedQuery);
    
    // 1. Filtrage sur la Base de Données
    const { data: allProducts } = await supabase.from('products').select('*');
    if (allProducts) {
      const matchedProducts = allProducts.filter((p: any) => normalizedQuery.includes(removeAccents(p.name)));
      const matchedProductIds = matchedProducts.map((p: any) => p.id);
      
      if (matchedProductIds.length > 0) {
        const { data: allPrices } = await supabase.from('price_records')
           .select('*')
           .in('product_id', matchedProductIds)
           .order('record_date', { ascending: false });
           
        if (allPrices) {
           matchedProducts.forEach((p: any) => {
              const pPrices = allPrices.filter((pr: any) => pr.product_id === p.id).slice(0, 5);
              pPrices.forEach((pr: any) => {
                 dbPriceContext += `- ${p.name}: ${pr.price} ${pr.currency} / ${pr.unit || p.default_unit} (Lieu: ${pr.location || 'Non précisé'}, Date: ${pr.record_date})\n`;
              });
           });
        }
      }
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
