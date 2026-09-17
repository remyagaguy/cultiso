-- Fonction pour rechercher des prix de marché de manière native (sans N+1 côté Node.js)
CREATE OR REPLACE FUNCTION search_market_prices(search_term text)
RETURNS TABLE (
    product_id uuid,
    product_name text,
    product_default_unit text,
    price numeric,
    currency text,
    unit text,
    location text,
    record_date date
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.default_unit,
        pr.price,
        pr.currency,
        pr.unit,
        pr.location,
        pr.record_date
    FROM public.products p
    JOIN public.price_records pr ON p.id = pr.product_id
    -- On cherche dans le nom du produit. L'application envoie une requête normalisée (sans accents).
    WHERE lower(p.name) LIKE '%' || lower(search_term) || '%'
    ORDER BY p.name, pr.record_date DESC
    LIMIT 20;
END;
$$ LANGUAGE plpgsql;
