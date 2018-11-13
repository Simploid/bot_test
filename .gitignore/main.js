const Discord=require("discord.js");
const bot = new Discord.Client();

class Joueurs{
	//Constructor
	constructor(nom,nb_de,id){
		this.nom=nom;
		this.nb_de=nb_de;
		this.liste_de=[0,0,0,0,0,0];
		this.id=id;
	}
	//Others functions
	aleatoire_de(){
		this.liste_de=[0,0,0,0,0,0];;
		var k;
		for(k=0;k<this.nb_de;k++){
			var r=Math.floor(Math.random()*6+1);
			this.liste_de[r-1]++;
			botinter.liste_de_memoire[r-1]++;
		}
	}

	perdre_de(){
		this.nb_de-=1
	}


}

class bot_interface{
	constructor(){
		this.liste_joueurs=[];
		this.liste_de_memoire=[0,0,0,0,0,0];
		this.prefix="*";
		this.der_expression=[0,0,null];
	}

	existe(nom){
		var verifier=0;
		/*for (k=0;k<this.liste_joueurs.length;k++){
			console.log("print1");
			if (this.liste_joueurs[k].nom===nom){
				verifier=1;
			}
		}
		console.log("gfffff");*/
		return verifier;
	}

	ajouter_joueur(nom,id){
		if (this.existe(nom)===0){
			var joueur=new Joueurs(nom,5,id);
			this.liste_joueurs.push(joueur);
		}
	}

	enlever_de(nom){
		var k=0;
		while (k<this.liste_joueurs.length && this.liste_joueurs[k].nom!=this.der_expression[2]){
			k++;
		}
		this.liste_joueurs[k].perdre_de();
		if (this.liste_joueurs[k].nb_de===0){
			delete this.liste_joueurs[k];
		}
	}
}

bot.on('ready' , () => {
	console.log("Bot ready");
	
});

bot.login("NTEwMDA1NzI4MjM3MzIyMjQw.DsfAcw.RzwdSSsdq9sb0IcTB6BmJOzeswg");

const botinter=new bot_interface();

bot.on("message",message=>{

	if (message.content[0]===botinter.prefix){
		switch (message.content){
			case botinter.prefix+"perudo":
				message.reply("Qui joue? -> chaque personne qui veut jouer doit dire :"+"\n"+botinter.prefix+"moi");
				break;
			
			case (botinter.prefix+"test message private"):
				console.log("hey");
				message.author.createDM().then(channel =>{
					channel.send("lol");
				});
				break;
			
			case (botinter.prefix+"moi"):
				message.author.createDM().then(channel => {
					channel.send("Nous avons pris en compte ta participation");
				});
				botinter.ajouter_joueur(message.author.username,message.author.id);
				break;
				
			
			case botinter.prefix+"fini":
				var iter=0;
				for (iter=0;iter<botinter.liste_joueurs.length;iter++){
					var k=iter;
					botinter.liste_joueurs[k].aleatoire_de();
					joueur=bot.users.get(botinter.liste_joueurs[k].id);
					joueur.send("merci de jouer! Tu as "+botinter.liste_joueurs[k].nb_de+" dés. Tape :\n"+botinter.prefix+"regle perudo"+"\n"+"Pour avoir les règles");
					for (e=0;e<6;e++){
						joueur.send("Tu as "+botinter.liste_joueurs[k].liste_de[e]+" : "+(e+1));
					}
				}
				break;

			case botinter.prefix+"menteur":
				if (botinter.der_expression[1]==1){
					if (botinter.der_expression[0]<=botinter.liste_de_memoire[0]){
						var nom_joueur=message.author.username;
						message.reply("tu t'es trompé, tu perds un dé");
						botinter.enlever_de(nom_joueur);
					}
					else {
						message.reply("tu as raison "+botinter.der_expression[2]+" perd un dé");
						botinter.enlever_de(botinter.der_expression[2]);
					}
				}
				else if (botinter.liste_de_memoire[botinter.der_expression[1]-1]+botinter.liste_de_memoire[0]>=botinter.der_expression[0]){
					var nom_joueur=message.author.username;
					message.reply("tu t'es trompé, tu perds un dé");
					botinter.enlever_de(nom_joueur);
				}
				else {
					message.reply("tu as raison "+botinter.der_expression[2]+" perd un dé");
					botinter.enlever_de(botinter.der_expression[2]);
				}

				var k=0;
				for (k=0;k<6;k++){
					message.channel.send(botinter.liste_de_memoire[k]+" "+(k+1));
				}
				message.channel.send(botinter.der_expression[0]+" "+botinter.der_expression[1]+" "+botinter.der_expression[2]);
				break;
			
			case botinter.prefix+"verif":
				var k=0;
				for (k=0;k<6;k++){
					message.channel.send(botinter.liste_de_memoire[k]);
				}
				message.channel.send(botinter.der_expression[0]+" "+botinter.der_expression[1]+" "+botinter.der_expression[2]);
				break;
			
			case botinter.prefix+"clean":
				var k=0;
				botinter.liste_joueurs=[];
				for (k=0;k<6;k++){
					botinter.liste_de_memoire[k]=0;
				}
				break;
			
			case botinter.prefix+"relancer":
				for (k=0;k<6;k++){
					botinter.liste_de_memoire[k]=0;
				}
				botinter.der_expression=[1,0,null];
				var iter=0;
				for (iter=0;iter<botinter.liste_joueurs.length;iter++){
					var k=iter;
					botinter.liste_joueurs[k].aleatoire_de();
					joueur=bot.users.get(botinter.liste_joueurs[k].id);
					joueur.send("merci de jouer! Tu as "+botinter.liste_joueurs[k].nb_de+" dés. Tape :\n"+botinter.prefix+"regle perudo"+"\n"+"Pour avoir les règles");
					for (e=0;e<6;e++){
						joueur.send("Tu as "+botinter.liste_joueurs[k].liste_de[e]+" : "+(e+1));
					}
				}
				break;
			
			case botinter.prefix+"help":
				message.author.send("tu peux parier avec la syntaxe : \n *pari nombre_dé valeur_dé \n Par exemple : \n "+"*pari 5 3 \n tu peux dire menteur avec : *menteur");
				break;
			
			case botinter.prefix+"nique":
				message.reply(" Vu que tu fais de la quiche lorraine, je ne t'aimes pas");
				break;	
			

		}
		var val=message.content.split(" ")
		if (val[0]===botinter.prefix+"pari"){
			botinter.der_expression[0]=val[1];
			botinter.der_expression[1]=val[2];
			botinter.der_expression[2]=message.author.username;
		}
		else if(val[0]==botinter.prefix+"roll"){
			var les_de=val[1].split("d");
			var i=0;
			var result=" Tu as tiré ";
			for (i=0;i<les_de[0];i++){
				var r=Math.floor(Math.random()*les_de[1]+1);
				result+=r;
				if (i!=les_de[0]-1){
					result+="+";
				}
			}
			message.reply(result);
		}
	}
})
