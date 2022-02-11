function AddInventory(rolistes,boutique,nomObjet,joueurNom){
    objet = boutique.shop.ShopObjet[nomObjet].Objet;
    console.log(objet);
    if(objet.Stackable == false && typeof rolistes[joueurNom].Inv[nomObjet] !== "undefined")
    {
        console.log("entré 1");
        var i = 0;
        while(i = 0 || typeof rolistes[joueurNom].Inv[nomObjet + i] !== "undefined"){i++;}
        rolistes[joueurNom].Inv[nomObjet + i] = {
            Nom:objet.Nom,
            Quantity:objet.Quantity,
            Stackable:objet.Stackable,
            Remain:objet.Remain,
            Unity:objet.Unity,
            Quality:objet.Quality,
            Weight:objet.Weight,
            Description:objet.Description
        };
        console.log("entré 1");
    } else if (objet.Stackable == false && typeof rolistes[joueurNom].Inv[nomObjet] === "undefined"){
        console.log("entré 2");
        rolistes[joueurNom].Inv[nomObjet] = {
            Nom:objet.Nom,
            Quantity:objet.Quantity,
            Stackable:objet.Stackable,
            Remain:objet.Remain,
            Unity:objet.Unity,
            Quality:objet.Quality,
            Weight:objet.Weight,
            Description:objet.Description
        };
        console.log("entré 2");
    } else if (objet.Stackable == true && typeof rolistes[joueurNom].Inv[nomObjet] !== "undefined"){
        rolistes[joueurNom].Inv[nomObjet] += objet.Quantity;
        console.log("entré 3");
    } else{
        console.log("entré 4");
        rolistes[joueurNom].Inv[nomObjet] += {
            Nom:objet.Nom,
            Quantity:objet.Quantity,
            Stackable:objet.Stackable,
            Remain:objet.Remain,
            Unity:objet.Unity,
            Quality:objet.Quality,
            Weight:objet.Weight,
            Description:objet.Description
        };
        console.log("entré 4");
    }
    return rolistes;
}

exports.AddInventory = AddInventory;