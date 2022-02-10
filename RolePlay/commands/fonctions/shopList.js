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
                EmbObjet = "Rah j'ai rien en boutique aujourd'hui, désoler";
        }
        embed.addField("Marchand: Voilà ce que j'ai en stock",EmbObjet);
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
                        EmbObjet = "J'ai rien en boutique aujourd'hui, désolé";
                    }
                embed.addField("Marchand: Un très bel outil que tu cherche là !",EmbObjet);
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

exports.ShopListObjet = ShopListObjet;