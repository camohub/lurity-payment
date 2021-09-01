# vue-lurity-sandbox

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


###Udaje k Braintree sandboxu 

- environment: sandbox
- merchantId: xxxxxxxxxxxxxxxxx
- publicKey: xxxxxxxxxxxxxxxxxx
- privateKey: xxxxxxxxxxxxxxxxxxxxx
- login: https://sandbox.braintreegateway.com/login


Payment
=========
To znamena:

Bude stacit, ak tam bude nasadeny „cisty“ buefy (aby sa to dalo neskor 
implementovat do existujuceho dizajnu) budu tam dva stlpce vedla seba
 v lavom bude informacia o karte, v pravom bude sumar 
Zdroj dat bude konkretna kampan
https://portal.lurity.com/campaigns/7028f519b6a9fd42
 Nastavil som tam aj 10% zlavu, aby sme otestovali aj zobrazenie zlavy
 V pripade tohto testu bude uhrada s DPH, co je 20%  (pri CZ firmach sa bude stahovat suma bez DPH)
Samotna platba a zadanie karty.

Na API vystavim testovaci endpoint pre generovane Braintree tokenu

Na API vystavim testovaci endpoint pre platbu


Poslem vam udaje o nasom testovacom braintree ucte cez ktory budeme robit platby. 
Este som konzultoval obrazovky s kolegom dizajnerom. Tak ako to je teraz na 
screenshotoch nesedi uplne s realitou ako to ma fungovat.
 

Krok 1
------
Vyber formy platby (Karta. Google Pay, ....)
https://www.braintreepayments.com/images/products/direct/direct-seamless@2x.png 

Toto je OK 

Krok 2
------

Zadanie informacii o karte 

Odtialto by mala vypadnut Paypal a Pridat platobnu metodu. 
Miesto toho by tam mal byt len „Ulozit kartu“

Krok 3
------

Potvrdenie platby 

Tato obrazovka by mala vyzerat uplne inak. Nemal by tam byt vyber medzi 
platobnymi metodami ale len ta jedna karta, ktoru som zadal v predchadzajucom kroku.


 

Idealne riesenie by bolo, keby bol krok 2 a 3 spojeny do jedneho. 
To znamena ze zaplatenim sa rovno karta aj ulozi. Tak ako to je na tom 
obrazky vyssie. To znamena, ze buttony Zaplatit a 
Zrusit by sa presunuli z praveho stlpca do laveho (pod pridanie karty).