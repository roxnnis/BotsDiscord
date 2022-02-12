function AddInventory(rolistes,objet,joueurNom){
    console.log("4adin - " + rolistes[joueurNom].Inv[nomObjet]);
    if(objet.Stackable == false && typeof rolistes[joueurNom].Inv[nomObjet] !== "undefined")
    {
        var i = 1;
        while(typeof rolistes[joueurNom].Inv[nomObjet + " " + i] !== "undefined"){i++;}
        rolistes[joueurNom].Inv[nomObjet + " " + i] = {
            Nom:objet.Nom,
            Quantity:objet.Quantity,
            Stackable:objet.Stackable,
            Remain:objet.Remain,
            Unity:objet.Unity,
            Quality:objet.Quality,
            Weight:objet.Weight,
            Description:objet.Description
        };
    } else if (objet.Stackable == false && typeof rolistes[joueurNom].Inv[nomObjet] === "undefined"){
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
    } else if (objet.Stackable == true && typeof rolistes[joueurNom].Inv[nomObjet] !== "undefined"){
        rolistes[joueurNom].Inv[nomObjet] += objet.Quantity;
    } else{
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
    }
    return rolistes;
}

function AddWeapon({rolistes,objet,slot = "Principale"}){
    if(objet.Hand == 2)
    {
        oldWeapon = [rolistes.Weapons["Principale"],rolistes.Weapons["Auxiliaire"]];
        rolistes.Weapons["Principale"] = {
            Nom: objet.Nom,
            Type: objet.Type,
            Hand: objet.Hand,
            Weight: objet.Weight,
            Damage: objet.Damage,
            Precision: objet.Precision,
            Munitions: objet.Munitions,
            Effects: objet.Effects
        };
        delete rolistes.Weapons["Auxiliaire"];
    }
    else if(objet.Hand == 1)
    {
        if(typeof rolistes.Weapons["Principale"] !== "undefined")
        {
            if(rolistes.Weapons["Principale"].Hand == 2)
            {
                oldWeapon = [rolistes.Weapons["Principale"]];
                rolistes.Weapons["Principale"] = {
                    Nom: objet.Nom,
                    Type: objet.Type,
                    Hand: objet.Hand,
                    Weight: objet.Weight,
                    Damage: objet.Damage,
                    Precision: objet.Precision,
                    Munitions: objet.Munitions,
                    Effects: objet.Effects
                }
            }
            else {
                oldWeapon = [rolistes.Weapons[slot]];
                rolistes.Weapons[slot] = {
                    Nom: objet.Nom,
                    Type: objet.Type,
                    Hand: objet.Hand,
                    Weight: objet.Weight,
                    Damage: objet.Damage,
                    Precision: objet.Precision,
                    Munitions: objet.Munitions,
                    Effects: objet.Effects
                }
            }
        }
        else{
            oldWeapon = [rolistes.Weapons["Principale"]];
            rolistes.Weapons["Principale"] = {
                Nom: objet.Nom,
                Type: objet.Type,
                Hand: objet.Hand,
                Weight: objet.Weight,
                Damage: objet.Damage,
                Precision: objet.Precision,
                Munitions: objet.Munitions,
                Effects: objet.Effects
            }
        }
    }
    return [rolistes,oldWeapon];
}

function AddArmor({rolistes,objet}){
    oldWeapon = [rolistes.Armors.Principale];
    rolistes.Armors["Principale"] = {
        Nom: objet.Nom,
        Type: objet.Type,
        Weight: objet.Weight,
        Res: objet.Res,
        Effects: objet.Effects
    };
    return [rolistes,oldWeapon];
}

exports.AddInventory = AddInventory;
exports.AddArmor = AddArmor;
exports.AddWeapon = AddWeapon; 