var kairinis = 34;
var desininis = 34;
var Kalade = [];
var DealerKalade = [];
var PlayerKalade = [];
started = false;
vykstaValymas = false;
const StartMygtukas = document.querySelector(".StartMygtukas");
const DealMygtukas = document.querySelector(".DealMygtukas");
const DealerNuotrauka = document.querySelector("#player1");
const PlayerNuotrauka = document.querySelector("#player2");
DealerNuotrauka.style.display = "none";
PlayerNuotrauka.style.display = "none";
DealMygtukas.onclick = function()
{
    if(started && !vykstaValymas)
    {
        Tikrinimas();
    }
    else if (!started){
        alert("Pradekite zaidima");
    }
};
function atnaujintiTaskus()
{
    const PirmoPlayerTaskai = document.querySelector(".AtnaujinamasKiekis1");
    const AntroPlayerTaskai = document.querySelector(".AtnaujinamasKiekis2");
    PirmoPlayerTaskai.innerHTML = DealerKalade.length;
    AntroPlayerTaskai.innerHTML = PlayerKalade.length;
}
function isvalyti()
{
    vykstaValymas = true;
    const kortuEile = document.querySelector(".PaddingDiv");
    const kortuEile2 = document.querySelector(".PaddingDiv2");
    kortuEile.style.minHeight = "100px";
    kortuEile2.style.minHeight = "0px";
    kairinis = 34;
    desininis = 34;
    while (kortuEile.firstChild) {
        kortuEile.removeChild(kortuEile.lastChild);
    }
    while (kortuEile2.firstChild) {
        kortuEile2.removeChild(kortuEile2.lastChild);
    }
    vykstaValymas = false;
}
function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}
function IsmaisytiKalade() {
    for(let i = 0; i < 52;i++)
    {
        Kalade[i] = i;
    }
    for (var i = Kalade.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = Kalade[i];
        Kalade[i] = Kalade[j];
        Kalade[j] = temp;
    }
}
function laimejo1(){
    const pirmasis = document.querySelector(".pirmasis");
    const antrasis = document.querySelector(".antrasis");
    pirmasis.style = "animation: color-changeW 1s 1;";
    antrasis.style = "animation: color-changeL 1s 1;";
}
function laimejo2(){
    const pirmasis = document.querySelector(".pirmasis");
    const antrasis = document.querySelector(".antrasis");
    pirmasis.style = "animation: color-changeL 1s 1;";
    antrasis.style = "animation: color-changeW 1s 1;";
}
function isdalintiKalade()
{
    for(let i = 0; i < 26;i++)
    {
        DealerKalade[i] = Kalade.pop();
        PlayerKalade[i] = Kalade.pop();
    }
}
async function karas()
{
    if(DealerKalade.length < 4)
    {
        started = false;
        alert("Laimejo Player");
    }
    else if(PlayerKalade.length < 4)
    {
        started= false;
        alert("Laimejo Dealer");
    }
    if(started)
    {
        const PlayerLangas = document.querySelector(".PlayLine");
        const DealerLangas = document.querySelector(".DealLine");
        for(let i = 0; i < 3;i++)
        {
            Kalade.push(DealerKalade[0]);
            Kalade.push(PlayerKalade[0]);
            KarasDealer(DealerKalade[0], 0);
            KarasPlayer(PlayerKalade[0], 0);
            DealerKalade.shift();
            PlayerKalade.shift();
        }
        KarasDealer(DealerKalade[0], 1);
        KarasPlayer(PlayerKalade[0], 1);
        PlayerLangas.style = "justify-content:right;";
        DealerLangas.style = "justify-content:left;";
        PlayerNuotrauka.style.display = "none";
        DealerNuotrauka.style.display = "none";
    }

}
function KarasDealer(source, rodyti)
{
    const kortuEile = document.querySelector(".PaddingDiv");
    kortuEile.style.minHeight="200px";
    kairinis = kairinis + 12;
    const kortele = document.createElement("img");
    kortele.classList.add("nuotrauka");
    kortele.classList.add("default1");
    if(rodyti == 1)
    {
        kortele.src="img/cards/"+source+".png";
        kortele.style.width = "110px";
        kortele.style.height = "150px";
        kortele.style.top = "3px";
    }
    kortele.style.left = kairinis + "px";
    kortuEile.appendChild(kortele);
}
function KarasPlayer(source, rodyti)
{
    const kortuEile = document.querySelector(".PaddingDiv2");
    kortuEile.style.minHeight="200px";
    desininis = desininis + 12;
    const kortele = document.createElement("img");
    kortele.classList.add("nuotrauka");
    kortele.classList.add("default2");
    if(rodyti == 1)
    {
        kortele.src="img/cards/"+source+".png";
        kortele.style.width = "110px";
        kortele.style.height = "150px";
        kortele.style.top = "3px";
    }
    kortele.style.right = desininis + "px";
    kortuEile.appendChild(kortele);
}
function paslepti()
{
    const kortuEile = document.querySelector(".PaddingDiv");
    const kortuEile2 = document.querySelector(".PaddingDiv2");
    kortuEile.style.minHeight = "100px";
    kortuEile2.style.minHeight = "0px";
}
function Tikrinimas()
{
    const PlayerLangas = document.querySelector(".PlayLine");
    const DealerLangas = document.querySelector(".DealLine");
    if(PlayerKalade.length == 52)
    {
        started = false;
        alert("Laimejo Player 2!");
    }
    else if(DealerKalade.length == 52)
    {
        started = false;
        alert("Laimejo Player 1");
    }
    if((PlayerKalade[0]% 13) > (DealerKalade[0] % 13) && started)
    {
        paslepti();
        PlayerNuotrauka.style.display = "inline";
        DealerNuotrauka.style.display = "inline";
        Kalade.push(PlayerKalade[0]);
        Kalade.push(DealerKalade[0]);
        PlayerKalade.shift();
        DealerKalade.shift();
        while(Kalade.length > 0)
        {
            PlayerKalade.push(Kalade.pop());
        }
        isvalyti();
        PlayerLangas.style = "justify-content:center;";
        DealerLangas.style = "justify-content:center;";
        PlayerNuotrauka.src = "img/cards/"+PlayerKalade[0]+".png";
        DealerNuotrauka.src = "img/cards/"+DealerKalade[0]+".png";
        laimejo2();
        atnaujintiTaskus();
    }
    else if((PlayerKalade[0]% 13) < (DealerKalade[0] % 13) && started)
    {
        paslepti();
        PlayerNuotrauka.style.display = "inline";
        DealerNuotrauka.style.display = "inline";
        Kalade.push(PlayerKalade[0]);
        Kalade.push(DealerKalade[0]);
        PlayerKalade.shift();
        DealerKalade.shift();
        while(Kalade.length > 0)
        {
            DealerKalade.push(Kalade.pop());
        }
        isvalyti();
        PlayerLangas.style = "justify-content:center;";
        DealerLangas.style = "justify-content:center;";
        PlayerNuotrauka.src = "img/cards/"+PlayerKalade[0]+".png";
        DealerNuotrauka.src = "img/cards/"+DealerKalade[0]+".png";
        laimejo1();
        atnaujintiTaskus();
    }
    else if((PlayerKalade[0]% 13) == (DealerKalade[0] % 13) && started)
    {
        alert("Lygiosis, prasideda karas!");
        karas();
    }
    console.log("Player 1 kortu skaicius: " + DealerKalade.length + " Player 2 kortu skaicius: " + PlayerKalade.length);

}
StartMygtukas.onclick = function(){
    if(!started)
    {
        paslepti();
        started = true;
        IsmaisytiKalade();
        isdalintiKalade();
        atnaujintiTaskus();
        PlayerNuotrauka.src = "img/cards/"+PlayerKalade[0]+".png";
        DealerNuotrauka.src = "img/cards/"+DealerKalade[0]+".png";
        DealerNuotrauka.style.display = "inline";
        PlayerNuotrauka.style.display = "inline";
    }
    else
    {
        alert("Jau esate pradeje zaidima!");
    }
        for(let i = 0; i < 26;i++)
        {
            console.log(i + " Iteration value: " + DealerKalade[i]);
        }
        for(let i = 0; i < 26;i++)
        {
            console.log(i + " Iteration value: " + PlayerKalade[i]);
        }
};


