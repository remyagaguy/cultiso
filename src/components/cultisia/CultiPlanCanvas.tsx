import React from "react";

export function CultiPlanCanvas({ data }: { data: any }) {
  if (!data) return null;

  // Format number
  const formatMoney = (val: any) => {
    if (val === undefined || val === null) return "-";
    return Number(val).toLocaleString("fr-FR") + " FCFA";
  };

  // Check if it's the NEW format (with meta and resume_executif)
  const isNewFormat = !!data.meta || !!data.resume_executif;

  if (!isNewFormat) {
    // Fallback for old format
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-4xl">
        <h2 className="text-2xl font-bold font-unbounded text-[#0B5345] mb-4">Projet : {data.nom_projet}</h2>
        <div className="space-y-8">
          {data.resume && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">1. Résumé Exécutif</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.resume}</p>
            </section>
          )}
          {data.etude_marche && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">2. Étude de Marché</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.etude_marche}</p>
            </section>
          )}
          {data.strategie_commerciale && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">3. Stratégie Commerciale</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.strategie_commerciale}</p>
            </section>
          )}
          {data.etude_technique && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">4. Étude Technique & Opérationnelle</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.etude_technique}</p>
            </section>
          )}
          {data.etude_financiere && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">5. Étude Financière</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.etude_financiere}</p>
            </section>
          )}
          {data.risques && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">6. Risques & Mesures d'Atténuation</h3>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.risques}</p>
            </section>
          )}
          {(data.pestel || data.swot) && (
            <section>
              <h3 className="font-bold text-lg border-b border-[#0B5345]/20 pb-2 mb-3 text-[#0B5345]">7. Annexes Stratégiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {data.pestel && (
                  <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-[15px] mb-2 text-gray-800">Analyse PESTEL</h4>
                    <p className="text-gray-600 text-[14px] whitespace-pre-wrap leading-relaxed">{data.pestel}</p>
                  </div>
                )}
                {data.swot && (
                  <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-[15px] mb-2 text-gray-800">Analyse FFOM / SWOT</h4>
                    <p className="text-gray-600 text-[14px] whitespace-pre-wrap leading-relaxed">{data.swot}</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // NEW FORMAT RENDERING
  const {
    meta,
    resume_executif,
    etude_marche,
    strategie_commerciale,
    etude_technique,
    etude_financiere,
    risques,
    plan_action,
    pestel,
    swot
  } = data;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-4xl space-y-12">
      {/* HEADER / META */}
      <div className="border-b-4 border-[#0B5345] pb-6">
        <h1 className="text-3xl font-bold font-unbounded text-[#0B5345] mb-4">
          {meta?.nom_projet || "Business Plan"}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div><strong>Porteur :</strong> {meta?.porteur_projet || "-"}</div>
          <div><strong>Filière :</strong> {meta?.filiere || "-"}</div>
          <div><strong>Échelle :</strong> {meta?.echelle_projet || "-"}</div>
          <div>
            <strong>Localisation :</strong>{" "}
            {[meta?.localisation?.region, meta?.localisation?.prefecture, meta?.localisation?.localite].filter(Boolean).join(", ") || "-"}
          </div>
          <div><strong>Horizon :</strong> {meta?.horizon_plan_annees ? `${meta.horizon_plan_annees} ans` : "-"}</div>
        </div>
      </div>

      {/* 1. RESUME EXECUTIF */}
      {resume_executif && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">1</span>
            Résumé Exécutif
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6 bg-[#FAFAFA] p-5 rounded-xl">{resume_executif.synthese}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="text-xs text-green-700 font-bold mb-1 uppercase tracking-wide">Investissement (CAPEX)</div>
              <div className="text-lg font-unbounded text-[#0B5345]">{formatMoney(resume_executif.chiffres_cles?.investissement_total_capex_fcfa)}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <div className="text-xs text-orange-700 font-bold mb-1 uppercase tracking-wide">CA (Année 1)</div>
              <div className="text-lg font-unbounded text-[#D35400]">{formatMoney(resume_executif.chiffres_cles?.chiffre_affaires_annee_1_fcfa)}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="text-xs text-blue-700 font-bold mb-1 uppercase tracking-wide">Résultat Net (A1)</div>
              <div className="text-lg font-unbounded text-blue-900">{formatMoney(resume_executif.chiffres_cles?.resultat_net_annee_1_fcfa)}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <div className="text-xs text-purple-700 font-bold mb-1 uppercase tracking-wide">TRI / VAN</div>
              <div className="text-lg font-unbounded text-purple-900">
                {resume_executif.chiffres_cles?.tri_pourcent || 0}% / {formatMoney(resume_executif.chiffres_cles?.van_fcfa)}
              </div>
            </div>
          </div>
          
          {resume_executif.facteurs_cles_succes && resume_executif.facteurs_cles_succes.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Facteurs clés de succès :</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                {resume_executif.facteurs_cles_succes.map((fcs: string, idx: number) => <li key={idx}>{fcs}</li>)}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* 2. ETUDE DE MARCHE */}
      {etude_marche && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">2</span>
            Étude de Marché
          </h2>
          <div className="space-y-6">
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Demande</h3>
              <p className="text-gray-700 text-sm">{etude_marche.demande?.description}</p>
              <div className="mt-3 text-sm text-gray-600">
                <strong>Taille :</strong> {etude_marche.demande?.taille_marche_estimee} | <strong>Tendance :</strong> {etude_marche.demande?.tendance}
              </div>
            </div>
            
            {etude_marche.segments_clients && etude_marche.segments_clients.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Segments Cibles</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 border-collapse">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-3 font-bold">Segment</th>
                        <th className="p-3 font-bold">Besoins</th>
                        <th className="p-3 font-bold">Pouvoir d'achat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {etude_marche.segments_clients.map((c: any, i: number) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-3 font-medium text-gray-800">{c.segment}</td>
                          <td className="p-3">{c.besoins}</td>
                          <td className="p-3">{c.pouvoir_achat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Opportunités</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {etude_marche.opportunites_marche?.map((o: string, i: number) => <li key={i}>{o}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Menaces / Barrières</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {etude_marche.menaces_marche?.map((o: string, i: number) => <li key={i}>{o}</li>)}
                  {etude_marche.barrieres_entree?.map((o: string, i: number) => <li key={i} className="text-orange-600">{o}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. STRATEGIE COMMERCIALE */}
      {strategie_commerciale && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">3</span>
            Stratégie Commerciale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Politique de Prix</h3>
              <p className="text-sm text-gray-700 mb-2">{strategie_commerciale.politique_prix?.methode}</p>
              <div className="text-lg font-bold text-[#D35400] mb-1">
                {formatMoney(strategie_commerciale.politique_prix?.prix_vente_unitaire_fcfa)} / {strategie_commerciale.politique_prix?.unite_vente}
              </div>
              <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded font-medium">
                {strategie_commerciale.politique_prix?.positionnement_prix}
              </span>
            </div>
            
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Distribution & Partenariats</h3>
              <ul className="text-sm text-gray-700 space-y-2 mb-3">
                {strategie_commerciale.canaux_distribution?.map((c: any, i: number) => (
                  <li key={i} className="flex justify-between border-b pb-1">
                    <span>{c.canal}</span>
                    <span className="font-bold">{c.part_estimee_pourcent}%</span>
                  </li>
                ))}
              </ul>
              {strategie_commerciale.partenariats_cibles?.length > 0 && (
                <p className="text-sm text-gray-600">
                  <strong>Cibles :</strong> {strategie_commerciale.partenariats_cibles.join(", ")}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. ETUDE TECHNIQUE */}
      {etude_technique && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">4</span>
            Étude Technique & Opérationnelle
          </h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">Site / Foncier</h3>
                <p className="font-medium">{etude_technique.foncier?.surface_totale_ha || "-"} ha ({etude_technique.foncier?.statut})</p>
                <p className="text-sm text-gray-600 mt-1">Coût: {formatMoney(etude_technique.foncier?.cout_acquisition_ou_location_fcfa)}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-sm text-gray-500 uppercase mb-2">Ressources en Eau</h3>
                <p className="font-medium">{etude_technique.ressources_hydriques?.source} ({etude_technique.ressources_hydriques?.disponibilite})</p>
                <p className="text-sm text-gray-600 mt-1">{etude_technique.ressources_hydriques?.systeme_irrigation}</p>
              </div>
            </div>

            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-3">Capacité & Production</h3>
              <div className="flex flex-wrap gap-6 text-sm">
                <div><strong>Rendement:</strong> {etude_technique.capacite_production?.rendement_par_ha_ou_unite}</div>
                <div><strong>Volume Annuel:</strong> {etude_technique.capacite_production?.volume_annuel_prevu}</div>
                <div><strong>Cycles/an:</strong> {etude_technique.capacite_production?.nombre_cycles_par_an}</div>
              </div>
              {etude_technique.calendrier_cultural && (
                <p className="mt-3 text-sm text-gray-700 italic">"{etude_technique.calendrier_cultural}"</p>
              )}
            </div>

            {etude_technique.equipements_materiel && etude_technique.equipements_materiel.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Équipements & Matériel</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600 border-collapse">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="p-2 font-bold">Désignation</th>
                        <th className="p-2 font-bold">Qté</th>
                        <th className="p-2 font-bold text-right">Coût Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {etude_technique.equipements_materiel.map((e: any, i: number) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="p-2 font-medium">{e.designation}</td>
                          <td className="p-2">{e.quantite}</td>
                          <td className="p-2 text-right">{formatMoney(e.cout_total_fcfa)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. ETUDE FINANCIERE */}
      {etude_financiere && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">5</span>
            Étude Financière
          </h2>
          
          <div className="space-y-8">
            {/* CAPEX & Plan Fi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Plan d'Investissement (CAPEX)</h3>
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  {etude_financiere.capex?.detail?.map((d: any, i: number) => (
                    <li key={i} className="flex justify-between">
                      <span className="truncate pr-2">{d.categorie}</span>
                      <span className="font-medium whitespace-nowrap">{formatMoney(d.montant_fcfa)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between text-base font-bold text-[#0B5345] pt-2 border-t">
                  <span>TOTAL CAPEX</span>
                  <span>{formatMoney(etude_financiere.capex?.total_capex_fcfa)}</span>
                </div>
              </div>

              <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Plan de Financement</h3>
                <ul className="space-y-2 text-sm text-gray-700 mb-4">
                  {etude_financiere.plan_financement?.sources?.map((s: any, i: number) => (
                    <li key={i} className="flex justify-between items-center">
                      <span>{s.source}</span>
                      <div className="text-right">
                        <span className="font-medium block">{formatMoney(s.montant_fcfa)}</span>
                        <span className="text-xs text-gray-500">{s.part_pourcent}%</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between text-base font-bold text-[#0B5345] pt-2 border-t">
                  <span>TOTAL FINANCEMENT</span>
                  <span>{formatMoney(etude_financiere.plan_financement?.total_besoin_financement_fcfa)}</span>
                </div>
              </div>
            </div>

            {/* OPEX & BFR */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                <h3 className="font-bold text-gray-800">Charges d'Exploitation & BFR (Année 1)</h3>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-600 mb-3 uppercase">Charges Variables</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {etude_financiere.opex?.charges_variables?.map((c: any, i: number) => (
                      <li key={i} className="flex justify-between">
                        <span>{c.poste}</span>
                        <span className="font-medium">{formatMoney(c.montant_annuel_fcfa)}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-sm font-bold text-gray-600 mt-6 mb-3 uppercase">Charges Fixes</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {etude_financiere.opex?.charges_fixes?.map((c: any, i: number) => (
                      <li key={i} className="flex justify-between">
                        <span>{c.poste}</span>
                        <span className="font-medium">{formatMoney(c.montant_annuel_fcfa)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-3">Besoin en Fonds de Roulement (BFR)</h4>
                  <div className="space-y-2 text-sm text-blue-800 mb-4">
                    <div className="flex justify-between"><span>Stocks moyens:</span> <span>{formatMoney(etude_financiere.bfr?.stock_moyen_fcfa)}</span></div>
                    <div className="flex justify-between"><span>Créances clients:</span> <span>{formatMoney(etude_financiere.bfr?.creances_clients_fcfa)}</span></div>
                    <div className="flex justify-between"><span>Dettes fournisseurs:</span> <span>{formatMoney(etude_financiere.bfr?.dettes_fournisseurs_fcfa)}</span></div>
                  </div>
                  <div className="text-lg font-bold text-blue-900 border-t border-blue-200 pt-2 flex justify-between">
                    <span>TOTAL BFR</span>
                    <span>{formatMoney(etude_financiere.bfr?.montant_bfr_fcfa)}</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-3 italic">{etude_financiere.bfr?.commentaire}</p>
                </div>
              </div>
            </div>

            {/* Compte de Résultat */}
            {etude_financiere.compte_resultat_previsionnel && etude_financiere.compte_resultat_previsionnel.length > 0 && (
              <div className="overflow-x-auto">
                <h3 className="font-bold text-gray-800 mb-3">Compte de Résultat Prévisionnel</h3>
                <table className="w-full text-sm text-left border-collapse border border-gray-200">
                  <thead className="bg-[#0B5345] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-green-800">Poste</th>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => (
                        <th key={i} className="p-3 font-bold text-right border-r border-green-800 last:border-0">Année {c.annee}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b bg-gray-50">
                      <td className="p-3 font-medium border-r">Chiffre d'Affaires</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right font-medium">{formatMoney(c.chiffre_affaires_fcfa)}</td>)}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-gray-600 border-r">- Charges Variables</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right text-gray-600">{formatMoney(c.charges_variables_fcfa)}</td>)}
                    </tr>
                    <tr className="border-b bg-green-50/30">
                      <td className="p-3 font-bold text-[#0B5345] border-r">= Marge Brute</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right font-bold text-[#0B5345]">{formatMoney(c.marge_brute_fcfa)}</td>)}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-gray-600 border-r">- Charges Fixes</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right text-gray-600">{formatMoney(c.charges_fixes_fcfa)}</td>)}
                    </tr>
                    <tr className="border-b bg-orange-50/30">
                      <td className="p-3 font-bold text-[#D35400] border-r">= EBE</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right font-bold text-[#D35400]">{formatMoney(c.ebe_fcfa)}</td>)}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-gray-600 border-r">- Amortissements & Frais Fin.</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right text-gray-600">{formatMoney((c.amortissements_fcfa || 0) + (c.frais_financiers_fcfa || 0))}</td>)}
                    </tr>
                    <tr className="border-b bg-blue-50/30">
                      <td className="p-3 font-bold text-blue-900 border-r">= RÉSULTAT NET</td>
                      {etude_financiere.compte_resultat_previsionnel.map((c: any, i: number) => <td key={i} className="p-3 text-right font-bold text-blue-900">{formatMoney(c.resultat_net_fcfa)}</td>)}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Hypothèses */}
            {etude_financiere.hypotheses_cles && etude_financiere.hypotheses_cles.length > 0 && (
              <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-sm">
                <h4 className="font-bold text-yellow-800 mb-2">⚠️ Hypothèses Clés de Modélisation</h4>
                <ul className="list-disc pl-5 text-yellow-900 space-y-1">
                  {etude_financiere.hypotheses_cles.map((h: string, i: number) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6. RISQUES */}
      {risques && risques.length > 0 && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">6</span>
            Risques & Mesures d'Atténuation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {risques.map((r: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-[#FAFAFA]">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{r.categorie}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.impact === 'Élevé' || r.probabilite === 'Élevée' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    P:{r.probabilite} / I:{r.impact}
                  </span>
                </div>
                <p className="font-bold text-gray-800 text-sm mb-2">{r.risque}</p>
                <div className="text-sm text-[#0B5345] bg-green-50 p-2 rounded border border-green-100">
                  <strong>Mesure:</strong> {r.mesures_attenuation}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. PLAN D'ACTION */}
      {plan_action && plan_action.length > 0 && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">7</span>
            Prochaines Étapes
          </h2>
          <ul className="space-y-3">
            {plan_action.map((p: any, i: number) => (
              <li key={i} className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{p.etape}</h4>
                  <div className="text-sm text-gray-500 mt-1 flex gap-4">
                    <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {p.delai}</span>
                    <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> {p.responsable}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      
      {/* 8. ANNEXES (SWOT/PESTEL) */}
      {(pestel || swot) && (
        <section>
          <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
            <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">8</span>
            Annexes Stratégiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {swot && (
              <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Matrice SWOT</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-bold text-green-700 mb-1">Forces</h4>
                    <ul className="list-disc pl-4 text-gray-600">{swot.forces?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 mb-1">Faiblesses</h4>
                    <ul className="list-disc pl-4 text-gray-600">{swot.faiblesses?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-700 mb-1">Opportunités</h4>
                    <ul className="list-disc pl-4 text-gray-600">{swot.opportunites?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-orange-700 mb-1">Menaces</h4>
                    <ul className="list-disc pl-4 text-gray-600">{swot.menaces?.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                  </div>
                </div>
              </div>
            )}
            {pestel && (
              <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Analyse PESTEL</h3>
                <ul className="text-sm space-y-2 text-gray-700">
                  {pestel.politique && <li><strong>Politique:</strong> {pestel.politique.join(", ")}</li>}
                  {pestel.economique && <li><strong>Économique:</strong> {pestel.economique.join(", ")}</li>}
                  {pestel.social && <li><strong>Social:</strong> {pestel.social.join(", ")}</li>}
                  {pestel.technologique && <li><strong>Technologique:</strong> {pestel.technologique.join(", ")}</li>}
                  {pestel.environnemental && <li><strong>Environnemental:</strong> {pestel.environnemental.join(", ")}</li>}
                  {pestel.legal && <li><strong>Légal:</strong> {pestel.legal.join(", ")}</li>}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}
