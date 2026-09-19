import React from "react";

export function CultiPlanCanvas({ data }: { data: any }) {
  if (!data) return null;

  // Format number
  const formatMoney = (val: any) => {
    if (val === undefined || val === null) return "-";
    return Number(val).toLocaleString("fr-FR") + " FCFA";
  };

  // Determine which format we are dealing with
  const isV2Format = !!data.synthese && !!data.projet && !!data.financier;
  const isV1Format = !!data.meta && !!data.resume_executif && !data.synthese;

  if (isV2Format) {
    const { meta, synthese, projet, marche, technique, marketing, risques, financier, conclusion } = data;
    const syn = synthese?.fiche_synoptique;
    const res = synthese?.resume_executif;

    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-4xl space-y-12">
        {/* HEADER / META */}
        <div className="border-b-4 border-[#0B5345] pb-6">
          <h1 className="text-3xl font-bold font-unbounded text-[#0B5345] mb-4">
            {syn?.nom_entreprise || projet?.nom_projet || "Business Plan"}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div><strong>Porteur :</strong> {syn?.promoteur || "-"}</div>
            <div><strong>Filière :</strong> {syn?.filieres?.join(", ") || "-"}</div>
            <div><strong>Objectif :</strong> {meta?.objectif_plan || "-"}</div>
            <div><strong>Localisation :</strong> {syn?.localisation || "-"}</div>
            <div><strong>Date :</strong> {meta?.date_generation || "-"}</div>
          </div>
        </div>

        {/* 1. RESUME EXECUTIF */}
        {res && (
          <section>
            <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
              <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">1</span>
              Résumé Exécutif
            </h2>
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100 mb-6 space-y-3">
              <p className="text-[#0B5345] font-bold text-lg">{res.accroche}</p>
              <p><strong>Problème :</strong> {res.probleme}</p>
              <p><strong>Solution :</strong> {res.solution}</p>
              <p><strong>Avantage Concurrentiel :</strong> {res.avantage_concurrentiel}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <div className="text-xs text-green-700 font-bold mb-1 uppercase tracking-wide">Coût Total</div>
                <div className="text-lg font-unbounded text-[#0B5345]">{formatMoney(syn?.cout_total_projet)}</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                <div className="text-xs text-orange-700 font-bold mb-1 uppercase tracking-wide">CA (Année 1)</div>
                <div className="text-lg font-unbounded text-[#D35400]">{formatMoney(syn?.chiffre_affaires_annee_1)}</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="text-xs text-blue-700 font-bold mb-1 uppercase tracking-wide">Montant Recherché</div>
                <div className="text-lg font-unbounded text-blue-900">{formatMoney(res.montant_recherche)}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <div className="text-xs text-purple-700 font-bold mb-1 uppercase tracking-wide">TRI / VAN</div>
                <div className="text-lg font-unbounded text-purple-900">
                  {syn?.indicateurs_cles?.tri_pourcentage || 0}% / {formatMoney(syn?.indicateurs_cles?.van)}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. ETUDE DE MARCHE */}
        {marche && (
          <section>
            <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
              <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">2</span>
              Étude de Marché
            </h2>
            <div className="space-y-6">
              <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">Analyse de la demande</h3>
                <p className="text-gray-700 text-sm">{marche.analyse_demande}</p>
              </div>
              
              {marche.segments_cibles && marche.segments_cibles.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Segments Cibles</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 border-collapse">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="p-3 font-bold">Segment</th>
                          <th className="p-3 font-bold">Taille estimée</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marche.segments_cibles.map((c: any, i: number) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="p-3 font-medium text-gray-800">{c.nom}</td>
                            <td className="p-3">{c.taille_estimee}</td>
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

        {/* 3. MARKETING */}
        {marketing && (
          <section>
            <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
              <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">3</span>
              Marketing & Distribution
            </h2>
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">Stratégie de prix</h3>
              <p className="text-gray-700 text-sm whitespace-pre-wrap">{marketing.strategie_prix}</p>
            </div>
          </section>
        )}

        {/* 4. TECHNIQUE */}
        {technique && (
          <section>
            <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
              <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">4</span>
              Étude Technique
            </h2>
            <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">Processus de production</h3>
              <p className="text-gray-700 text-sm">{technique.processus_production}</p>
            </div>
          </section>
        )}

        {/* 5. FINANCIER */}
        {financier && (
          <section>
            <h2 className="text-xl font-bold font-unbounded text-[#0B5345] mb-4 flex items-center gap-2">
              <span className="bg-[#0B5345] text-white w-8 h-8 flex items-center justify-center rounded-lg text-sm">5</span>
              Étude Financière
            </h2>
            <div className="space-y-6">
              {financier.plan_financement_initial && (
                <div className="bg-[#FAFAFA] p-5 rounded-xl border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Plan de Financement Initial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-[#0B5345] mb-2">Besoins (Emplois)</h4>
                      <ul className="text-sm space-y-2 text-gray-700">
                        {financier.plan_financement_initial.besoins?.map((b: any, i: number) => (
                          <li key={i} className="flex justify-between border-b border-gray-100 pb-1">
                            <span>{b.rubrique}</span>
                            <span className="font-medium">{formatMoney(b.montant)}</span>
                          </li>
                        ))}
                        <li className="flex justify-between font-bold text-gray-900 pt-2">
                          <span>TOTAL BESOINS</span>
                          <span>{formatMoney(financier.plan_financement_initial.total_besoins)}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-orange-600 mb-2">Ressources</h4>
                      <ul className="text-sm space-y-2 text-gray-700">
                        {financier.plan_financement_initial.ressources?.map((r: any, i: number) => (
                          <li key={i} className="flex justify-between border-b border-gray-100 pb-1">
                            <span>{r.source}</span>
                            <span className="font-medium">{formatMoney(r.montant)}</span>
                          </li>
                        ))}
                        <li className="flex justify-between font-bold text-gray-900 pt-2">
                          <span>TOTAL RESSOURCES</span>
                          <span>{formatMoney(financier.plan_financement_initial.total_ressources)}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
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
              Risques & Mesures d&apos;Atténuation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {risques.map((r: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-[#FAFAFA]">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{r.type}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium bg-orange-100 text-orange-700`}>
                      Niveau: {r.niveau_criticite}
                    </span>
                  </div>
                  <p className="font-bold text-gray-800 text-sm mb-2">{r.description}</p>
                  <div className="text-sm text-[#0B5345] bg-green-50 p-2 rounded border border-green-100">
                    <strong>Mesure:</strong> {r.mesures_mitigation}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    );
  }

  // FALLBACK FOR VERY OLD V0 FORMAT
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 w-full max-w-4xl">
      <h2 className="text-2xl font-bold font-unbounded text-[#0B5345] mb-4">Projet : {data.nom_projet || "Business Plan"}</h2>
      <div className="space-y-8 text-gray-700">
        <p>Le document a été généré, mais son format n&apos;est pas pris en charge par cet affichage.</p>
        <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

