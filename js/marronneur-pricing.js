// Configuration des commissions et options pour les Marronneurs
// Système de tarification pour les freelances

const MarronneurPricingConfig = {
  // Commissions sur les ventes
  commissions: {
    standard: {
      rate: 20, // 20% de commission
      name: "Compte Standard",
      description: "Pour les marronneurs occasionnels",
      features: [
        "Accès à toutes les demandes",
        "Profil de base",
        "Messagerie",
        "Paiements sécurisés",
        "Support standard"
      ]
    },
    pro: {
      rate: 15, // 15% de commission (plus attractif que Fiverr)
      name: "Marronner Plus",
      monthlyPrice: 29, // 29€/mois
      annualPrice: 290, // 290€/an (économie de 58€)
      description: "Pour les marronneurs professionnels",
      features: [
        "Commission réduite à 15% au lieu de 20%",
        "Badge Premium visible sur le profil",
        "Mise en avant dans les résultats",
        "Portfolio étendu (20 projets au lieu de 5)",
        "Statistiques avancées",
        "Réponse prioritaire aux demandes",
        "Support prioritaire 24/7",
        "Certification de compétences",
        "Outils de facturation avancés",
        "Formation continue gratuite"
      ],
      savings: {
        breakEvenPoint: 580, // Point mort : 580€ de CA/mois
        example: "Si tu gagnes 1000€/mois, tu économises 50€ en frais !"
      }
    }
  },

  // Options payantes individuelles
  paidOptions: {
    spotlight: {
      name: "Mise en avant",
      icon: "⭐",
      prices: {
        daily: 5, // 5€/jour
        weekly: 25, // 25€/semaine (économie de 10€)
        monthly: 80 // 80€/mois (économie de 70€)
      },
      benefits: [
        "Apparition en tête des résultats",
        "+300% de visibilité",
        "Badge 'Mis en avant'",
        "Notification aux chercheurs"
      ],
      description: "Booste ta visibilité et décroche plus de missions"
    },
    
    premiumBadge: {
      name: "Badge Premium",
      icon: "🏆",
      price: 15, // 15€/mois
      benefits: [
        "Badge doré sur ton profil",
        "Marque de confiance",
        "+50% de crédibilité",
        "Filtrage 'Marronneurs Premium'"
      ],
      description: "Distingue-toi comme un professionnel de confiance"
    },

    urgentResponse: {
      name: "Réponse urgente",
      icon: "⚡",
      price: 3, // 3€ par réponse
      benefits: [
        "Ta proposition arrive en premier",
        "Badge 'Répond rapidement'",
        "Notification push au chercheur",
        "+80% de chance d'être choisi"
      ],
      description: "Sois le premier à répondre aux demandes urgentes"
    },

    portfolioBoost: {
      name: "Portfolio étendu",
      icon: "🎨",
      price: 10, // 10€/mois
      benefits: [
        "Jusqu'à 50 projets dans ton portfolio",
        "Galerie photos illimitée",
        "Vidéos de présentation",
        "Témoignages clients en avant"
      ],
      description: "Montre toute l'étendue de ton talent"
    }
  },

  // Packs combinés
  packages: {
    starter: {
      name: "Pack Starter",
      price: 49,
      period: "monthly",
      includes: ["premiumBadge", "portfolioBoost"],
      savings: 10, // Économie vs achat séparé
      description: "Idéal pour débuter avec un profil pro"
    },
    
    growth: {
      name: "Pack Growth",
      price: 99,
      period: "monthly",
      includes: ["pro", "premiumBadge", "portfolioBoost"],
      savings: 35,
      description: "Le meilleur rapport qualité-prix pour se développer"
    },

    elite: {
      name: "Pack Elite",
      price: 179,
      period: "monthly",
      includes: ["pro", "spotlight-monthly", "premiumBadge", "portfolioBoost", "urgentResponse-unlimited"],
      savings: 85,
      description: "Pour les marronneurs qui veulent dominer leur catégorie",
      exclusive: [
        "Garantie de visibilité",
        "Manager de compte dédié",
        "Analyse de performance mensuelle",
        "Accès aux demandes entreprises"
      ]
    }
  },

  // TVA
  vat: {
    rate: 8.5, // TVA La Réunion
    applicableOn: ["subscriptions", "options"]
  }
};

// Fonction pour calculer la commission sur une vente
function calculateMarronneurCommission(saleAmount, accountType = 'standard') {
  const rate = MarronneurPricingConfig.commissions[accountType].rate;
  const commission = (saleAmount * rate) / 100;
  const netAmount = saleAmount - commission;

  return {
    saleAmount: parseFloat(saleAmount.toFixed(2)),
    commissionRate: rate,
    commission: parseFloat(commission.toFixed(2)),
    netAmount: parseFloat(netAmount.toFixed(2)),
    accountType: accountType
  };
}

// Fonction pour comparer Standard vs Pro
function compareStandardVsPro(monthlyRevenue) {
  const standardCommission = (monthlyRevenue * 20) / 100;
  const proCommission = (monthlyRevenue * 15) / 100;
  const proSubscription = MarronneurPricingConfig.commissions.pro.monthlyPrice;
  
  const standardNet = monthlyRevenue - standardCommission;
  const proNet = monthlyRevenue - proCommission - proSubscription;
  
  const savings = proNet - standardNet;
  const worthIt = savings > 0;
  
  return {
    monthlyRevenue: monthlyRevenue,
    standard: {
      commission: standardCommission,
      net: standardNet
    },
    pro: {
      commission: proCommission,
      subscription: proSubscription,
      net: proNet
    },
    savings: parseFloat(savings.toFixed(2)),
    worthIt: worthIt,
    recommendation: worthIt 
      ? `✅ Marronner Plus te fait économiser ${Math.abs(savings).toFixed(2)}€/mois !`
      : `⚠️ Attends d'avoir ${MarronneurPricingConfig.commissions.pro.savings.breakEvenPoint}€/mois de CA pour rentabiliser`
  };
}

// Fonction pour calculer le ROI d'une option
function calculateOptionROI(optionName, expectedIncreasedRevenue) {
  const option = MarronneurPricingConfig.paidOptions[optionName];
  if (!option) return null;

  const monthlyCost = optionName === 'spotlight' 
    ? option.prices.monthly 
    : option.price;

  const vat = (monthlyCost * MarronneurPricingConfig.vat.rate) / 100;
  const totalCost = monthlyCost + vat;

  const increasedCommission = (expectedIncreasedRevenue * 20) / 100; // Supposant compte standard
  const netIncrease = expectedIncreasedRevenue - increasedCommission;
  const netGain = netIncrease - totalCost;
  
  const roi = ((netGain / totalCost) * 100).toFixed(1);

  return {
    optionName: option.name,
    monthlyCost: monthlyCost,
    vat: parseFloat(vat.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    expectedIncreasedRevenue: expectedIncreasedRevenue,
    netGain: parseFloat(netGain.toFixed(2)),
    roi: parseFloat(roi),
    worthIt: netGain > 0,
    recommendation: netGain > 0
      ? `✅ ROI de ${roi}% - Tu gagnes ${netGain.toFixed(2)}€/mois net`
      : `⚠️ Augmente d'abord ton CA de ${Math.abs(netGain).toFixed(2)}€/mois pour rentabiliser`
  };
}

// Fonction pour afficher un récapitulatif de commission
function displayCommissionBreakdown(saleAmount, accountType = 'standard') {
  const calc = calculateMarronneurCommission(saleAmount, accountType);
  const config = MarronneurPricingConfig.commissions[accountType];

  return `
╔════════════════════════════════════════════════════╗
║         RÉCAPITULATIF DE COMMISSION               ║
║         (${config.name})                           
╠════════════════════════════════════════════════════╣
║ Montant de la vente         │ ${calc.saleAmount.toFixed(2)} €
║ Commission (${calc.commissionRate}%)             │ -${calc.commission.toFixed(2)} €
╠════════════════════════════════════════════════════╣
║ TU REÇOIS                   │ ${calc.netAmount.toFixed(2)} €
╚════════════════════════════════════════════════════╝

${accountType === 'standard' ? `
💡 Avec Marronner Plus (15%), tu recevrais ${calculateMarronneurCommission(saleAmount, 'pro').netAmount.toFixed(2)}€
   soit ${(calculateMarronneurCommission(saleAmount, 'standard').netAmount - calculateMarronneurCommission(saleAmount, 'pro').netAmount + MarronneurPricingConfig.commissions.pro.monthlyPrice).toFixed(2)}€ de plus par mois (hors abonnement) !
` : ''}
  `;
}

// Fonction pour recommander le meilleur plan
function recommendBestPlan(monthlyRevenue, needsVisibility = false, needsPortfolio = false) {
  const comparison = compareStandardVsPro(monthlyRevenue);
  
  let recommendation = {
    plan: null,
    reason: "",
    monthlyCost: 0,
    monthlySavings: 0
  };

  // Moins de 580€/mois : Standard
  if (monthlyRevenue < 580) {
    recommendation.plan = "standard";
    recommendation.reason = "Commence avec le compte Standard. Passe à Plus quand tu atteindras 580€/mois de CA.";
    recommendation.monthlyCost = 0;
  }
  // 580-1500€/mois : Marronner Plus seul
  else if (monthlyRevenue < 1500) {
    recommendation.plan = "pro";
    recommendation.reason = "Marronner Plus te fait économiser sur les commissions.";
    recommendation.monthlyCost = 29;
    recommendation.monthlySavings = comparison.savings;
  }
  // 1500-3000€/mois : Pack Growth
  else if (monthlyRevenue < 3000) {
    recommendation.plan = "growth";
    recommendation.reason = "Le Pack Growth combine économies de commission et visibilité accrue.";
    recommendation.monthlyCost = 99;
    recommendation.monthlySavings = comparison.savings + 35;
  }
  // Plus de 3000€/mois : Pack Elite
  else {
    recommendation.plan = "elite";
    recommendation.reason = "Le Pack Elite maximise ta visibilité et tes revenus. Manager dédié inclus.";
    recommendation.monthlyCost = 179;
    recommendation.monthlySavings = comparison.savings + 85;
  }

  // Ajustements selon besoins
  if (needsVisibility && recommendation.plan === "standard") {
    recommendation.plan = "starter";
    recommendation.reason = "Le Pack Starter te donne un profil premium pour te démarquer.";
    recommendation.monthlyCost = 49;
  }

  return recommendation;
}

// Export des fonctions et config
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MarronneurPricingConfig,
    calculateMarronneurCommission,
    compareStandardVsPro,
    calculateOptionROI,
    displayCommissionBreakdown,
    recommendBestPlan
  };
}
