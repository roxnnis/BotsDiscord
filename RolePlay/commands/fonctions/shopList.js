const { MessageEmbed } = require("discord.js");

function ShopListObjet(boutique,objetnom,joueur){
    var Privacy = false;
    if(objetnom == "all")
    {
        embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Boutique de consommable")
            .addField("\u200b", "\u200b");
            
            EmbObjet = "";
            Privacy = false;
            if(Object.keys(boutique.shop["ShopObjet"]).length != 0)
            {
                EmbObjet = "Voilà mon stock \r\n\n";
                for(var key in boutique.shop["ShopObjet"])
                {
                    if(boutique.shop["ShopObjet"][key].Visible)
                    {
                        EmbObjet +=
                            boutique.shop["ShopObjet"][key].Objet.Nom +
                            " à " +
                            boutique.shop["ShopObjet"][key].Prix + " crédits";
                        
                        if(boutique.shop["ShopObjet"][key].Objet.Quantity != 1){
                            EmbObjet +=
                                " le lot de " + boutique.shop["ShopObjet"][key].Objet.Quantity;
                        }
                        EmbObjet +=
                            "\r\n";
                    }
                }
                if(EmbObjet == "Voilà mon stock \r\n\n")
                {
                    EmbObjet = "J'ai rien pour toi";
                    Privacy = true;
                }
            } else {
                EmbObjet = "J'ai rien pour toi";
                Privacy = true;
        }
        embed.addField("Marchand:",EmbObjet);
        return {message: embed, privee: Privacy};
    }
    else {
        try{
            if(typeof boutique.shop["ShopObjet"][objetnom] === "undefined") throw "No Item";
            else{
                embed = new MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("Boutique de consommable")
                    .addField("\u200b", "\u200b");
                    
                    EmbObjet = "";
                    Privacy = false;
                    if(Object.keys(boutique.shop["ShopObjet"]).length != 0 && 
                        (boutique.shop["ShopObjet"][objetnom].Visible || 
                        (typeof joueur !== "undefined" && typeof joueur.Inv[objetnom] !== "undefined"))
                    )
                    {
                        EmbObjet += 
                            "On touche avec les yeux \r\n\n" +
                            boutique.shop["ShopObjet"][objetnom].Objet.Nom +
                            "\r\nPoids: " + boutique.shop["ShopObjet"][objetnom].Objet.Weight + " kg" +
                            "\r\nPrix: " + boutique.shop["ShopObjet"][objetnom].Prix + " crédits";

                        if(typeof boutique.shop["ShopObjet"][objetnom].Objet.Remain !== "undefined"){
                            EmbObjet += 
                                "\r\nNombre d'utilisation: " + boutique.shop["ShopObjet"][objetnom].Objet.Remain + 
                                " " + boutique.shop["ShopObjet"][objetnom].Objet.Unity;
                        }
                        if(typeof boutique.shop["ShopObjet"][objetnom].Objet.Quality !== "undefined"){
                            EmbObjet +=
                                "\r\nEtat: " + boutique.shop["ShopObjet"][objetnom].Objet.Quality;
                        }
                        if(typeof boutique.shop["ShopObjet"][objetnom].Objet.Description !== "undefined"){
                            EmbObjet +=
                                "\r\n\n" + boutique.shop["ShopObjet"][objetnom].Objet.Description;
                        }
                        Privacy = !boutique.shop["ShopObjet"][objetnom].Visible;
                    } else {
                        EmbObjet = "Revenez quand vous saurez ce que vous voulez !";
                        Privacy = true;
                    }
                embed.addField("Marchand:",EmbObjet);
                return {message: embed, privee: Privacy};
            }
        } catch(err){
            if(err == "No Item"){
                embed = new MessageEmbed().setColor("AQUA").setTitle("Boutique de consommable").addField("\u200b", "\u200b").addField("Marchand:","Revenez quand vous saurez ce que vous voulez !");
                return {message: embed, privee: true};
            }
        }
        
    }
}

function ShopListArme(boutique,objetnom,joueur){
    var Privacy = false;
    if(objetnom == "all")
    {
        embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Forge d'arme")
            .addField("\u200b", "\u200b");
            
            EmbObjet = "";
            Privacy = false;
            if(Object.keys(boutique.shop["ShopArmes"]).length != 0)
            {
                EmbObjet = "J'ai de tout pour tout le monde !\r\n\n";

                    for(var key in boutique.shop["ShopArmes"])
                    {
                        if(boutique.shop["ShopArmes"][key].Visible)
                        {
                            EmbObjet +=
                                boutique.shop["ShopArmes"][key].Objet.Nom +
                                " à " +
                                boutique.shop["ShopArmes"][key].Prix + " crédits" +
                                "\r\n";
                        }
                    }
                if(EmbObjet == "J'ai de tout pour tout le monde !\r\n\n")
                {
                    EmbObjet = "J'ai rien en boutique, repasse une autre fois";
                    Privacy = true;
                }
            } else {
                EmbObjet = "J'ai rien en boutique, repasse une autre fois";
                Privacy = true;
        }
        embed.addField("Forgerons:",EmbObjet);
        return {message: embed, privee: Privacy};
    }
    else {
        try{
            if(typeof boutique.shop["ShopArmes"][objetnom] === "undefined") throw "No Item";
            else{
                embed = new MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("Forge d'arme")
                    .addField("\u200b", "\u200b");
                    
                    EmbObjet = "";
                    Privacy = false;
                    if(Object.keys(boutique.shop["ShopArmes"]).length != 0 && 
                        (boutique.shop["ShopArmes"][objetnom].Visible || 
                        (typeof joueur !== "undefined" && typeof joueur.Weapons.Principale[objetnom] !== "undefined" || typeof joueur.Weapons.Auxiliaire[objetnom] !== "undefined"))
                    )
                    {
                        EmbObjet += 
                            "Admire ce chef-d'oeuvre !\r\n\n" +
                            boutique.shop["ShopArmes"][objetnom].Objet.Nom +
                            "\r\nCe petit bébé pèse " + boutique.shop["ShopArmes"][objetnom].Objet.Weight + " kg" +
                            "\r\nEt coûte seulement " + boutique.shop["ShopArmes"][objetnom].Prix + " crédits !" +
                            "\r\n\nIl te faut au moins " + boutique.shop["ShopArmes"][objetnom].Objet.Hand + " main(s) pour utiliser cette arme" +
                            "\r\nElle inflige " + boutique.shop["ShopArmes"][objetnom].Objet.Damage + " dégats" +
                            "\r\nPour une précision d'environ " + boutique.shop["ShopArmes"][objetnom].Objet.Precision + " !!";
                        
                        if(["Arc", "Fusil", "Pistolet"].includes(boutique.shop["ShopArmes"][objetnom].Objet.Type)){
                            EmbObjet += 
                                "\r\nTu peux tirer " + boutique.shop["ShopArmes"][objetnom].Objet.Munitions.Chargeur + " fois avant de devoir recharger" +
                                "\r\nEt je veux bien te faire cadeau de " + boutique.shop["ShopArmes"][objetnom].Objet.Munitions.Reserve + " munitions";
                        }
                        if(Object.keys(boutique.shop["ShopArmes"][objetnom].Objet.Effects).length != 0){
                            EmbObjet +=
                                "\r\n\nEt je suis assez fière de ses capacités !";
                            for(var key in boutique.shop["ShopArmes"][objetnom].Objet.Effects)
                            {
                                EmbObjet +="\r\n" + boutique.shop["ShopArmes"][objetnom].Objet.Effects[key];
                            }
                        }
                        EmbObjet +=
                                "\r\n\nC'est une affaire en or !";

                        Privacy = !boutique.shop["ShopArmes"][objetnom].Visible;

                    } else {
                        EmbObjet = "J'ai pas ça je crois bien, désolé";
                        Privacy = true;
                    }
                embed.addField("Forgerons:",EmbObjet);
                return {message: embed, privee: Privacy};
            }
        } catch(err){
            if(err == "No Item"){
                embed = new MessageEmbed().setColor("AQUA").setTitle("Forge d'arme").addField("\u200b", "\u200b").addField("Forgerons:","J'ai pas cet arme ici mon petit");
                return {message: embed, privee: true};
            }
        }
        
    }
}

function ShopListArmure(boutique,objetnom,joueur){
    var Privacy = false;
    if(objetnom == "all")
    {
        embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Armurerie")
            .addField("\u200b", "\u200b");
            
            EmbObjet = "";
            Privacy = false;
            if(Object.keys(boutique.shop["ShopArmures"]).length != 0)
            {
                EmbObjet = "J'ai quelques trucs qui traine, à toi de voir ce que tu veux\r\n\n";
                for(var key in boutique.shop["ShopArmures"])
                {
                    if(boutique.shop["ShopArmures"][key].Visible)
                    {
                        EmbObjet +=
                            boutique.shop["ShopArmures"][key].Objet.Nom +
                            " à " +
                            boutique.shop["ShopArmures"][key].Prix + " crédits" +
                            "\r\n";
                    }
                }
                if(EmbObjet == "J'ai quelques trucs qui traine, à toi de voir ce que tu veux")
                {
                    EmbObjet = "J'ai déjà tout écoulé on dirait, désolé";
                    Privacy = true;
                }
            } else {
                EmbObjet = "J'ai déjà tout écoulé on dirait, désolé";
                Privacy = true;
        }
        embed.addField("Armurier:",EmbObjet);
        return {message: embed, privee: Privacy};
    }
    else {
        try{
            if(typeof boutique.shop["ShopArmures"][objetnom] === "undefined") throw "No Item";
            else{
                embed = new MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("Armurerie")
                    .addField("\u200b", "\u200b");
                    
                    EmbObjet = "";
                    Possedee = false;
                    Privacy = false;
                    if(Object.keys(boutique.shop["ShopArmures"]).length != 0 && 
                        (boutique.shop["ShopArmures"][objetnom].Visible || 
                        (typeof joueur !== "undefined" && typeof joueur.Armors.Principale[objetnom] !== "undefined"))
                    )
                    {
                        EmbObjet += 
                            "Vas-y, te gènes pas, tu peux regarder de plus près \r\n\n" +
                            boutique.shop["ShopArmures"][objetnom].Objet.Nom +
                            "\r\nQui doit peser un bon " + boutique.shop["ShopArmures"][objetnom].Objet.Weight + " kg" +
                            "\r\nC'est a peu près normal pour des tenus en " + boutique.shop["ShopArmures"][objetnom].Objet.Type +
                            "\r\n\nJe dirais que la tenu te renforcera de " + boutique.shop["ShopArmures"][objetnom].Objet.Res.PHY + " sur le plan physique" +
                            "\r\nEt d'environs " + boutique.shop["ShopArmures"][objetnom].Objet.Res.MEN + " sur le plan mental";

                        
                        if(Object.keys(boutique.shop["ShopArmures"][objetnom].Objet.Effects).length != 0){
                            EmbObjet +=
                                "\r\n\nAprès réflexion, je crois me souvenir que cette tenue donne ";
                            for(var key in boutique.shop["ShopArmures"][objetnom].Objet.Effects)
                            {
                                EmbObjet +="\r\n" + boutique.shop["ShopArmures"][objetnom].Objet.Effects[key];
                            }
                        }

                        EmbObjet +=
                            "\r\n\nJe te la fais pour " + boutique.shop["ShopArmures"][objetnom].Prix + " crédits";

                        Privacy = !boutique.shop["ShopArmures"][objetnom].Visible;

                    } else {
                        EmbObjet = "J'ai déjà tout écoulé on dirait, désolé";
                        Privacy = true;
                    }
                embed.addField("Armurier:",EmbObjet);
                return {message: embed, privee: Privacy};
            }
        } catch(err){
            if(err == "No Item"){
                embed = new MessageEmbed().setColor("AQUA").setTitle("Armurerie").addField("\u200b", "\u200b").addField("Armurier:","Si tu l'as pas trouvé c'est que je dois pas l'avoir, désolé");
                return {message: embed, privee: true};
            }
        }
        
    }
}

exports.ShopListObjet = ShopListObjet;
exports.ShopListArme = ShopListArme;
exports.ShopListArmure = ShopListArmure;