-- ==========================================
-- TABLES CREATION
-- ==========================================

CREATE TABLE IF NOT EXISTS public.cultiplan_crops (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    base_temperature_c NUMERIC,
    upper_temperature_c NUMERIC,
    reference_harvest_index_pct NUMERIC,
    water_productivity_normalized NUMERIC
);

CREATE TABLE IF NOT EXISTS public.cultiplan_soils (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    curve_number NUMERIC,
    saturation_vol_pct NUMERIC,
    field_capacity_vol_pct NUMERIC,
    wilting_point_vol_pct NUMERIC,
    ksat_mm_day NUMERIC
);

-- ==========================================
-- INSERT CROPS
-- ==========================================

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('alfalfagdd', 'Artemis variety - Alfalfa', 5.0, 30.0, 100.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('barley', 'Crop Barley file for Dejen (Tigray, Ethiopia)', 0.0, 15.0, 33.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('barleygdd', 'Crop Barley file for Dejen (Tigray, Ethiopia)', 0.0, 15.0, 33.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('cassava', 'Default Cassava, Calendar (Columbia, Nigeria, Togo)', 10.0, 30.0, 60.0, 17.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('cotton', 'Default Cotton, Calendar (Cordoba, 15Apr86)', 12.0, 35.0, 35.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('cottongdd', 'Default Cotton, GDD (Cordoba, 15Apr86)', 12.0, 35.0, 35.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('drybean', 'Dry Bean: Kc(Trx) = 1.05; HI effect very strong', 9.0, 30.0, 40.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('drybeangdd', 'Dry Bean GDD: Kc(Trx) = 1.05; HI effect very strong', 9.0, 30.0, 40.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('maize', 'Default Maize, Calendar (Davis, 1Jun96)', 8.0, 30.0, 48.0, 33.7)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('maizegdd', 'Default Maize, GDD (Davis, 1Jun96)', 8.0, 30.0, 48.0, 33.7)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('paddyrice', 'Default Paddy Rice, Calendar (LosBanos, 15Jan04)', 8.0, 30.0, 43.0, 19.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('paddyricegdd', 'Default Paddy Rice, GDD (LosBanos, 15Jan04)', 8.0, 30.0, 43.0, 19.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('potato', 'Default Potato, Calendar (Lima, 17May95)', 2.0, 26.0, 75.0, 18.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('potatogdd', 'Default Potato, GDD (Lima, 17May95)', 2.0, 26.0, 75.0, 18.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('quinoa', 'Default Quinoa, Calendar (Bolivia, 15Oct)', 2.0, 30.0, 50.0, 10.5)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sorghum', 'Bushland Texas 1991 Sorghum 25 June 1991', 8.0, 30.0, 45.0, 33.7)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sorghumgdd', 'Bushland Texas 1993 Sorghum 27 May 1993', 8.0, 30.0, 45.0, 33.7)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('soybean', 'Default Soybean, Calendar (Patancheru, 25Jun96)', 5.0, 30.0, 40.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('soybeangdd', 'Default Soybean, GDD (Patancheru, 25Jun96)', 5.0, 30.0, 40.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sugarbeet', 'Default Sugar Beet, Calendar (Foggia, 22Mar00)', 5.0, 30.0, 70.0, 17.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sugarbeetgdd', 'Default Sugar Beet, GDD (Foggia, 22Mar00)', 5.0, 30.0, 70.0, 17.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sugarcane', 'as in Singels chpt', 9.0, 32.0, 35.0, 30.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sunflower', 'Default Sunflower, Calendar (Cordoba, 15Apr86)', 4.0, 30.0, 35.0, 18.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('sunflowergdd', 'Default Sunflower, GDD (Cordoba, 15Apr86)', 4.0, 30.0, 35.0, 18.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('tef', 'Dejen teff 2010', 10.0, 30.0, 27.0, 14.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('tomato', 'Default Tomato, Calendar (Cordoba, 1May86)', 7.0, 28.0, 63.0, 18.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('tomatogdd', 'Default Tomato, GDD (Cordoba, 1May86)', 7.0, 28.0, 63.0, 18.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('wheat', 'Default Wheat, Calendar (Valenzano, 23Nov07)', 0.0, 26.0, 48.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

INSERT INTO public.cultiplan_crops (slug, name, base_temperature_c, upper_temperature_c, reference_harvest_index_pct, water_productivity_normalized)
VALUES ('wheatgdd', 'Default Wheat, GDD (Valenzano, 23Nov07)', 0.0, 26.0, 48.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    base_temperature_c = EXCLUDED.base_temperature_c,
    upper_temperature_c = EXCLUDED.upper_temperature_c,
    reference_harvest_index_pct = EXCLUDED.reference_harvest_index_pct,
    water_productivity_normalized = EXCLUDED.water_productivity_normalized;

-- ==========================================
-- INSERT SOILS
-- ==========================================

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('clay', 'deep uniform ''heavy clay'' soil profile', 77.0, 55.0, 54.0, 39.0, 35.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('clayloam', 'deep uniform ''clay loam'' soil profile', 72.0, 50.0, 39.0, 23.0, 125.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('loam', 'deep uniform ''loamy'' soil profile', 61.0, 46.0, 31.0, 15.0, 500.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('loamysand', 'deep uniform ''loamy sand'' soil profile', 46.0, 38.0, 16.0, 8.0, 2200.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('paddy', 'paddy field (heavy clay)', 77.0, 54.0, 50.0, 32.0, 15.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('sand', 'deep uniform ''very sandy'' soil profile', 46.0, 36.0, 13.0, 6.0, 3000.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('sandyclay', 'deep uniform ''sandy clay'' soil profile', 77.0, 50.0, 39.0, 27.0, 35.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('sandyclayloam', 'deep uniform ''sandy clay loam'' soil profile', 72.0, 47.0, 32.0, 20.0, 225.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('sandyloam', 'deep uniform ''sandy loam'' soil profile', 46.0, 41.0, 22.0, 10.0, 1200.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('silt', 'deep uniform ''silt'' soil profile', 61.0, 43.0, 33.0, 9.0, 500.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('siltclayloam', 'deep uniform ''silty clay loam'' soil profile', 72.0, 52.0, 44.0, 23.0, 150.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('siltloam', 'deep uniform ''silty loam'' soil profile', 61.0, 46.0, 33.0, 13.0, 575.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('siltyclay', 'deep uniform ''silty clay'' soil profile', 72.0, 54.0, 50.0, 32.0, 100.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;

INSERT INTO public.cultiplan_soils (slug, name, curve_number, saturation_vol_pct, field_capacity_vol_pct, wilting_point_vol_pct, ksat_mm_day)
VALUES ('yoloclayloam6', 'Davis soil, ClayL layers FC inc. to 33% WP dec. to 13.8%, ready E=8 mm,3 m depth', 60.0, 51.0, 33.0, 13.8, 100.0)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    curve_number = EXCLUDED.curve_number,
    saturation_vol_pct = EXCLUDED.saturation_vol_pct,
    field_capacity_vol_pct = EXCLUDED.field_capacity_vol_pct,
    wilting_point_vol_pct = EXCLUDED.wilting_point_vol_pct,
    ksat_mm_day = EXCLUDED.ksat_mm_day;
