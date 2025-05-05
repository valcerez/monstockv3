// src/config/categories.js

import {
    Drumstick,
    Fish,
    Coffee,
    Apple,
    Leaf,
    Wheat,
    IceCream,
    Zap,
    Droplet,
    MilkIcon,
    GlassWater
  } from 'lucide-react'
  
  /**
   * Liste des catégories affichées dans l’app
   */
  export const CATEGORIES = [
    { label: 'Viande',     value: 'meat',       icon: Drumstick },
    { label: 'Poisson',    value: 'fish',       icon: Fish      },
    { label: 'Épices',     value: 'spices',     icon: Coffee    },
    { label: 'Fruits',     value: 'fruits',     icon: Apple     },
    { label: 'Légumes',    value: 'vegetables', icon: Leaf      },
    { label: 'Féculents',  value: 'starches',   icon: Wheat     },
    { label: 'Surgelés',   value: 'frozen',     icon: IceCream  },
    { label: 'Sauces',     value: 'sauces',     icon: Droplet    },
    { label: 'Divers',     value: 'misc',       icon: Zap       },
    { label: 'Fromages',   value: 'cheeses',    icon: MilkIcon},
    { label: 'Condiments', value: 'condiments', icon: GlassWater },
  ]
  
  /**
   * Mots-clés pour l’auto-catégorisation
   */
  export const CATEGORY_KEYWORDS = {
    meat: [
      // poulet
      'poulet', 'poulet', 'poulet rôti', 'poulet-roti', 'poulet roti',
      'poulet grillé', 'poulet grille', 'poule', 'poullet', 'poulllet', 'plouet',
  
      // dinde / canard / volaille
      'dinde', 'dinnde', 'dindee', 'canard', 'canrd', 'canar', 'oie', 'volaille',
  
      // bœuf / boeuf
      'bœuf', 'boeuf', 'beouf', 'boeuff', 'boeufs', 'bœufs', 'boeuf haché',
      'bœuf haché', 'viande hâchée', 'viande hachée', 'viande hachee',
      'haché', 'hache', 'haché', 'hamburger', 'burger', 'steak', 'steack',
      'steak haché', 'steak-haché', 'filet', 'filet de bœuf', 'filet boeuf',
      'entrecôte', 'entrecote', 'rumsteck', 'rosbif', 'roast beef', 'roastbeef',
      'rossbif', 'côte de bœuf', 'cote de boeuf',
  
      // veau
      'veau', 'veau', 'filet de veau', 'escalope de veau', 'escalope',
  
      // porc
      'porc', 'pork', 'poc', 'prorc', 'porcs', 'porc haché', 'haché de porc',
      'jambon', 'jambon cru', 'jambon cuit', 'jamon', 'ham', 'lard', 'lardon',
      'lardons', 'bacon', 'baconn', 'baco', 'bacon fumé',
  
      // charcuterie et saucisses
      'saucisse', 'saucisses', 'saucis', 'saucisse de Toulouse', 'merguez',
      'merguezs', 'chorizo', 'pepperoni', 'cervelas', 'cervelat',
      'boudin', 'boudin noir', 'boudin blanc', 'pâté', 'pate', 'paté',
      'rillettes', 'pâté de campagne', 'pate campagne',
  
      // plats préparés / divers
      'kebab', 'gyros', 'shawarma', 'cordon bleu', 'cordonbleu',
      'tourte', 'tourte viande', 'rôti', 'roti', 'rôti de porc', 'roti de porc',
      'côtelette', 'cotelette', 'côtelette d’agneau', 'cotelette agneau',
  
      // fallback générique
      'viande', 'viandes'
    ],
  
    fish: [
      // saumon et dérivés
      'saumon', 'saumon', 'saumon fumé', 'saumon-fumé', 'saumon fume', 'saumon fumee',
      'saumon frais', 'saummon', 'saumoné',
  
      // thon
      'thon', 'thon', 'thon en conserve', 'thon-conserve', 'thon en boite',
      'thon frais', 'thonn', 'thone', 'thôn',
  
      // poissons blancs
      'cabillaud', 'cabillau', 'cabilloud', 'morue', 'morue salée',
      'colin', 'colin d’Alaska', 'merlu', 'merlu',
  
      // petits poissons et conserves
      'sardine', 'sardines', 'sardinne', 'sardeene', 'maquereau', 'maquereaux',
      'maquerron', 'anchois', 'anchos', 'anchois', 'sprat', 'hareng', 'harenga',
  
      // crustacés
      'crevette', 'crevettes', 'crevette rose', 'crevettr', 'crevettte',
      'langoustine', 'langoustines', 'langouste', 'homard', 'crabe', 'crabes',
  
      // coquillages
      'moule', 'moules', 'huitre', 'huître', 'oyster', 'coquille Saint-Jacques',
      'coquille st jacques', 'coquilles Saint-Jacques',
  
      // autres
      'bar', 'bar commun', 'daurade', 'dorade', 'sole', 'sole meunière',
      'tilapia', 'poisson', 'poissons', 'poisson pané', 'pané', 'pané', 'poissson',
  
      // fallback générique
      'poisson'
    ],
  
    spices: [
      // sel
      'sel', 'sels', 'sel fin', 'gros sel', 'selgros', 'selgros', 'sel fni', 'selfin',
  
      // poivre
      'poivre', 'poivrr', 'poivvre', 'poivre noir', 'poivre blanc', 'poivre vert', 'poivre rouge',
      'poivre de Cayenne', 'poivre de cayenne', 'poivre de sichuan', 'poivre sichuan', 'poivre vert',
  
      // piment & paprika
      'piment', 'piment sec', 'piment doux', 'piment fort', 'pimentdoux', 'pimentfort',
      'paprika', 'paprika doux', 'paprika fort', 'paprika fumé', 'paprka',
  
      // curry
      'curry', 'curry doux', 'curry fort', 'currie', 'cury',
  
      // cumin
      'cumin', 'cuminn', 'cummin', 'cumin moulu', 'cuminu moulu',
  
      // curcuma
      'curcuma', 'curcuma moulu', 'curcuma frais', 'curcuma sec', 'curucma',
  
      // gingembre
      'gingembre', 'gingembre moulu', 'gingembre frais', 'gingembre sec', 'gingembr', 'gingimbe',
  
      // cannelle
      'cannelle', 'canelle', 'cannelle moulue', 'canellemoulue',
  
      // clou de girofle
      'clou de girofle', 'cloudegirofle', 'girofle', 'girofle moulue', 'clous de girofle',
  
      // muscade
      'muscade', 'muscade moulue', 'muscade rapée', 'muscade rapee',
  
      // herbes séchées
      'thym', 'thym sec', 'thym séché', 'thymseche',
      'romarin', 'romarin sec', 'romarin seche',
      'origan', 'origan sec', 'origanseche',
      'basilic', 'basilic sec', 'basilic seche',
      'estragon', 'estragon sec',
      'fenouil', 'fenouille', 'fenouil sec',
  
      // autres épices
      'papaye séchée', 'safran', 'safran moulu', 'curare', 
      'piment d’Espelette', 'pimentdespelette', 'épice', 'epice', 'epices', 'épices'
    ],
  
    fruits: [
      'pomme', 'pommes', 'pom', 'pomes', 'pommee', 'pommette', 'pomme golden', 'pomme granny', 'pomme reinette',
      'banane', 'bananes', 'bananna', 'bananee', 'banane plantain', 'plantain',
      'orange', 'oranges', 'orage', 'orenge', 'clémentine', 'clementine', 'mandarine', 'mandarines',
      'citron', 'citrons', 'citron vert', 'citron jaune', 'lime', 'limette', 'pamplemousse', 'pomelo',
      'raisin', 'raisins', 'raison', 'raison sec', 'raisin sec', 'raisin frais', 'raisin de table',
      'fraise', 'fraises', 'fraiss', 'frise', 'framboise', 'framboises', 'mûre', 'mures', 'mûres', 'mure',
      'groseille', 'groseilles', 'cassis', 'myrtille', 'myrtilles', 'airelle', 'airelles',
      'cerise', 'cerises', 'poire', 'poires', 'poire william', 'abricot', 'abricots', 'nectarine', 'nectarines',
      'prune', 'prunes', 'peche', 'pêche', 'pêches', 'peches', 'mirabelle', 'mirabelles', 'quetsche', 'quetsches',
      'melon', 'melons', 'pastèque', 'pasteque', 'pasteque', 'pastèques', 'kiwi', 'kiwis', 'kiwii',
      'mangue', 'mangues', 'ananas', 'ananas', 'banane plantain', 'fruits de la passion', 'goyave',
      'papaye', 'litchi', 'lichi', 'lichis', 'coco', 'noix de coco', 'fruit du dragon', 'pitaya',
      'noix', 'noix de cajou', 'cajou', 'amande', 'amandes', 'noisette', 'noisettes', 'pruneau',
      'figue', 'figues', 'raisin sec', 'abricot sec',
      'fruit', 'fruits'
    ],
    
    cheeses: [
      'fromage', 'fromages', 'gruyère', 'emmental', 'comté', 'parmesan', 'mozzarella', 'brie',
      'camembert', 'roquefort', 'bleu', 'chèvre', 'reblochon', 'raclette', 'cantal', 'tomme',
      'ricotta', 'feta', 'gorgonzola', 'mascarpone', 'philadelphia', 'boursin'
    ],
    
    condiments: [
      'cornichon', 'cornichons', 'câpres', 'capres', 'olives', 'olive', 'relish', 'pickles',
      'raifort'
    ],
  
    vegetables: [
      'tomate', 'tomates', 'tomatte', 'tomates cerises', 'tomate cerise', 'tomates-cerises',
      'tomate cœur de bœuf', 'tomate coeur de boeuf',
      'carotte', 'carottes', 'carrote', 'carrotee', 'carottes nouvelles',
      'salade', 'salades', 'laitue', 'laitues', 'batavia', 'romaine', 'mâche', 'mache',
      'épinard', 'épinards', 'epinard', 'epinards', 'chicorée', 'frisée', 'scarole',
      'chou', 'choux', 'chou-fleur', 'choufleur', 'chou fleur', 'choux-fleurs',
      'chou rouge', 'chou roug', 'chou vert', 'chou vert', 'chou de Brussels',
      'chou de bruxelles', 'courge', 'courgette', 'courgettes', 'courgete',
      'poivron', 'poivrons', 'poivron rouge', 'poivron vert', 'poivron jaune',
      'piment doux', 'pimentdoux', 'piment fort', 'pimentfort', 'piments doux',
      'oignon', 'oignons', 'ognion', 'ognions', 'échalote', 'echalote', 'échalotes', 'echalotes',
      'ail', 'ails', 'gousse d’ail', 'gousse dail',
      'pomme de terre', 'pommes de terre', 'pdt',
      'navet', 'navets', 'betterave', 'betteraves', 'rutabaga', 'topinambour', 'panais',
      'potiron', 'potirons', 'citrouille', 'courge spaghetti', 'butternut',
      'haricot vert', 'haricots verts', 'petits pois', 'pois', 'petit pois', 'pois chiche', 'pois chiches',
      'champignon', 'champignons', 'cepe', 'cèpe', 'morille', 'morilles', 'girolle', 'girolles', 'pleurote',
      'légume', 'légumes', 'poireaux', 'poireau'
    ],
  
    starches: [
      'pâte', 'pâtes', 'pates', 'pâte fraiche', 'pâtes fraîches', 'pates fraiches',
      'spaghetti', 'spaghettis', 'tagliatelle', 'tagliatelles', 'macaroni', 'macaronis',
      'penne', 'penne rigate', 'fusilli', 'farfalle', 'lasagne', 'lasagnes', 'gnocchi',
      'gnocci', 'tortellini', 'tortellinis',
      'riz', 'riz basmati', 'riz complet', 'riz sauvage', 'risotto', 'quinoa',
      'quinoa', 'millet', 'semoule', 'couscous', 'polenta',
      'pain', 'pains', 'baguette', 'baguettes', 'pain de mie', 'pain mie',
      'baguettte', 'brioche', 'croissant', 'croissants', 'viennoiserie',
      'farine', 'farines', 'fécule', 'fecule', 'fécule de maïs', 'fecule de mais',
      'amidon',
      'blé', 'ble', 'épeautre', 'epautre', 'orge', 'orge perlé',
      'seigle', 'mais', 'maïs', 'tortilla', 'tortillas',
      'féculent', 'féculents'
    ],
  
    frozen: [
      'légume surgelé', 'legume surgele', 'légume surgele', 'legume surgélé',
      'légumes surgelés', 'legumes surgeles', 'legumes surgelés',
      'brocoli surgelé', 'pois surgelés', 'haricots verts surgelés',
      'fruits surgelés', 'fruit surgelés', 'fruits surgeles', 'fruit surgeles',
      'mélange de légumes surgelés', 'mix de légumes surgelés',
      'poulet surgelé', 'poulet surgélé', 'poulet surgeles',
      'poisson surgelé', 'poisson surgeles', 'poisson surgélé',
      'crevettes surgelées', 'crevette surgeles', 'crevette surgelées',
      'steak haché surgelé', 'steak-surgelé', 'nuggets surgelés', 'nugget surgeles',
      'pizza surgelée', 'pizza surgeles', 'quiche surgelée', 'quiche surgeles',
      'lasagnes surgelées', 'lasagnes surgeles', 'gratin surgelé', 'gratin surgeles',
      'cordon bleu surgelé', 'cordon-bleu surgeles',
      'bâtonnets de poisson surgelés', 'batonnets de poisson surgelés', 'fish sticks surgelés',
      'glace', 'glaces', 'glace surgelée', 'glaces surgelées', 'esquimau', 'esquimaux',
      'sorbet', 'sorbets', 'crème glacée', 'creme glacee', 'creme glacée',
      'pizza', 'quiche', 'lasagnes', 'gratin', 'cordon bleu',
      'bâtonnets de poisson', 'batonnets de poisson', 'fish sticks',
      'congelé', 'congele', 'congelés', 'congeles', 'surgelé', 'surgeles', 'surgelés'
    ],
  
    sauces: [
      'sauce soja', 'soja', 'soja sauce', 'sauce soya',
      'ketchup', 'catsup', 'catchup', 'ketshup',
      'mayonnaise', 'mayo', 'mayonese', 'mayonaisse', 'mbaonnaise',
      'moutarde', 'mostarde', 'moutarde de Dijon', 'dijon moutarde',
      'vinaigrette', 'vinaigréte', 'vinagrette',
      'barbecue', 'bbq', 'sauce barbecue', 'bbq sauce', 'barbeque',
      'aioli', 'ailoi', 'ailoi zest',
      'pesto', 'pesto rouge', 'pesto vert',
      'tabasco', 'sriracha', 'sauce piquante', 'hot sauce',
      'sauce tomate', 'tomate sauce',
      'sauce curry', 'curry sauce'
    ],

  
  }
  