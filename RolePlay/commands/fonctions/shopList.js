const { MessageEmbed } = require("discord.js");

function ShopListObjet(boutique,objetnom){
    if(objetnom == "all")
    {
        embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Boutique de consommable")
            .addField("\u200b", "\u200b");
            
            EmbObjet = "";
            if(Object.keys(boutique.shop["ShopObjet"]).length != 0)
            {
                for(var key in boutique.shop["ShopObjet"])
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
            } else {
                EmbObjet = "J'ai rien pour toi";
        }
        embed.addField("Marchand: Voilà mon stock",EmbObjet);
        return embed;
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
                    if(Object.keys(boutique.shop["ShopObjet"]).length != 0)
                    {
                        EmbObjet += 
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

                    } else {
                        EmbObjet = "J'ai rien pour toi";
                    }
                embed.addField("Marchand: On touche avec les yeux",EmbObjet);
                return embed;
            }
        } catch(err){
            if(err == "No Item"){
                embed = new MessageEmbed().setColor("AQUA").setTitle("Boutique de consommable").addField("\u200b", "\u200b").addField("Marchand:","J'ai pas cet objet dans ma boutique mon petit");
                return embed;
            }
        }
        
    }
}

function ShopListArme(boutique,objetnom){
    if(objetnom == "all")
    {
        embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Forge d'arme")
            .addField("\u200b", "\u200b");
            
            EmbObjet = "";
            if(Object.keys(boutique.shop["ShopArmes"]).length != 0)
            {
                for(var key in boutique.shop["ShopArmes"])
                {
                    EmbObjet +=
                        boutique.shop["ShopArmes"][key].Objet.Nom +
                        " à " +
                        boutique.shop["ShopArmes"][key].Prix + " crédits" +
                        "\r\n";
                }
            } else {
                EmbObjet = "J'ai rien en boutique, repasse une autre fois";
        }
        embed.addField("Forgerons: J'ai de tout pour tout le monde !",EmbObjet);
        return embed;
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
                    if(Object.keys(boutique.shop["ShopArmes"]).length != 0)
                    {
                        EmbObjet += 
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
                        if(typeof boutique.shop["ShopArmes"][objetnom].Objet.Effects !== "undefined"){
                            EmbObjet +=
                                "\r\n\nEt je suis assez fière de ses capacités !";
                            for(var key in boutique.shop["ShopArmes"][objetnom].Objet.Effects)
                            {
                                EmbObjet +="\r\n" + boutique.shop["ShopArmes"][objetnom].Objet.Effects[key];
                            }
                        }
                        EmbObjet +=
                                "\r\n\nC'est une affaire en or !";

                    } else {
                        EmbObjet = "J'ai rien en boutique, repasse une autre fois";
                    }
                embed.addField("Forgerons: Admire ce chef-d'oeuvre !",EmbObjet);
                return embed;
            }
        } catch(err){
            if(err == "No Item"){
                embed = new MessageEmbed().setColor("AQUA").setTitle("Forge d'arme").addField("\u200b", "\u200b").addField("Forgerons:","J'ai pas cet arme ici mon petit");
                return embed;
            }
        }
        
    }
}

function ShopListArmure(boutique,objetnom){
    if(objetnom == "all")
    {
        embed = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Armurerie")
            .addField("\u200b", "\u200b");
            
            EmbObjet = "";
            if(Object.keys(boutique.shop["ShopArmures"]).length != 0)
            {
                for(var key in boutique.shop["ShopArmures"])
                {
                    EmbObjet +=
                        boutique.shop["ShopArmures"][key].Objet.Nom +
                        " à " +
                        boutique.shop["ShopArmures"][key].Prix + " crédits" +
                        "\r\n";
                }
            } else {
                EmbObjet = "J'ai déjà tout écoulé on dirait, désolé";
        }
        embed.addField("Armurier: J'ai quelques trucs qui traine, à toi de voir ce que tu veux",EmbObjet);
        return embed;
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
                    if(Object.keys(boutique.shop["ShopArmures"]).length != 0)
                    {
                        EmbObjet += 
                            boutique.shop["ShopArmures"][objetnom].Objet.Nom +
                            "\r\nQui doit peser un bon " + boutique.shop["ShopArmures"][objetnom].Objet.Weight + " kg" +
                            "\r\nC'est a peu près normal pour des tenus en " + boutique.shop["ShopArmures"][objetnom].Objet.Type +
                            "\r\n\nJe dirais que la tenu te renforcera de " + boutique.shop["ShopArmures"][objetnom].Objet.Res.PHY + " sur le plan physique" +
                            "\r\nEt d'environs " + boutique.shop["ShopArmures"][objetnom].Objet.Res.MEN + " sur le plan mental";

                        
                        if(typeof boutique.shop["ShopArmures"][objetnom].Objet.Effects !== "undefined"){
                            EmbObjet +=
                                "\r\n\nAprès réflexion, je crois me souvenir que cette tenue donne ";
                            for(var key in boutique.shop["ShopArmures"][objetnom].Objet.Effects)
                            {
                                EmbObjet +="\r\n" + boutique.shop["ShopArmures"][objetnom].Objet.Effects[key];
                            }
                        }

                        EmbObjet +=
                            "\r\n\nJe te la fais pour " + boutique.shop["ShopArmures"][objetnom].Prix + " crédits";

                    } else {
                        EmbObjet = "J'ai déjà tout écoulé on dirait, désolé";
                    }
                embed.addField("Armurier: Vas-y, te gènes pas, tu peux regarder de plus près",EmbObjet);
                return embed;
            }
        } catch(err){
            if(err == "No Item"){
                embed = new MessageEmbed().setColor("AQUA").setTitle("Armurerie").addField("\u200b", "\u200b").addField("Armurier:","Si tu l'as pas trouvé c'est que je dois pas l'avoir, désolé");
                return embed;
            }
        }
        
    }
}

exports.ShopListObjet = ShopListObjet;
exports.ShopListArme = ShopListArme;
exports.ShopListArmure = ShopListArmure;