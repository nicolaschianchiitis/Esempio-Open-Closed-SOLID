// Classe Articolo: la "base" per le altre classi che la specializzano
class Articolo {
    // Nota: "_" indica che il membro è protected!
    _tipo;
    _nome;
    _prezzo;
    _quantita;
    _disponibile;

    constructor(tipo, nome, prezzo, quantita) {
        this._tipo = tipo;
        this._nome = nome;
        this._prezzo = (prezzo < 0.0 ? -prezzo : prezzo);
        this._quantita = (quantita < 0 ? -quantita : quantita);
        this._disponibile = (this._quantita == 0 ? false : true);
    }

    get nome() {
        return this._nome;
    }

    toString() {
        return `Articolo: {\n  Tipo: ${this._tipo}\n  Nome: ${this._nome}\n  ` +
            `Prezzo in Euro: ${this._prezzo.toFixed(2)}\n  Quantità: ` +
            `${this._quantita}\n  Disponibile: ${(this._disponibile ? "sì" : "no")}\n}`;
    }

    compra(numPezzi) {
        if (this._disponibile && this._quantita >= numPezzi) {
            this._quantita -= numPezzi;
        }

        if (this._quantita == 0) {
            this._disponibile = false;
        } else {
            this._disponibile = true;
        }
    }
}

class Lettura extends Articolo {
    #numeroPagine;

    constructor(tipo, nome, prezzo, quantita, numeroPagine) {
        super(tipo, nome, prezzo, quantita);
        this.#numeroPagine = (numeroPagine < 0 ? -numeroPagine : numeroPagine);
    }

    toString() {
        let classname = this._tipo;
        classname[0].toUpperCase();
        return super.toString().replace("Articolo", classname).replace("}", "\n  ") +
            `Numero di pagine: ${this.#numeroPagine}\n}`;
    }

    sfoglia(){
        console.log("Sto sfogliando...");
    }
}

/*
    Classi che specializzano Articolo, aggiungendo funzionalità
    senza modificare la superclasse. Le prime tre specializzano
    un sottotipo di Articolo, ovvero Lettura, per espanderne
    le funzionalità
*/
class Libro extends Lettura {
    #autore;

    constructor(nome, prezzo, quantita, numeroPagine, autore) {
        super("libro", nome, prezzo, quantita, numeroPagine);
        this.#autore = autore;
    }

    toString() {
        return super.toString() + `Autore: ${this.#autore}\n}`;
    }

    sfoglia(){
        console.log("Sto sfogliando il libro...");
    }
}

class Rivista extends Lettura {
    #genere;

    constructor(nome, prezzo, quantita, numeroPagine, genere) {
        super("rivista", nome, prezzo, quantita, numeroPagine);
        this.#genere = genere;
    }

    toString() {
        return super.toString() + `Genere: ${this.#genere}\n}`;
    }

    sfoglia(){
        console.log("Sto sfogliando la rivista...");
    }
}

class Giornale extends Lettura {
    #localita;

    constructor(nome, prezzo, quantita, numeroPagine, localita) {
        super("giornale", nome, prezzo, quantita, numeroPagine);
        this.#localita = localita;
    }

    toString() {
        return super.toString() + `Località: ${this.#localita}\n}`;
    }

    sfoglia(){
        console.log("Sto sfogliando il giornale...");
    }
}

// BustinaFigurine specializza Articolo, il tipo "base" di prodotto
class BustinaFigurine extends Articolo {
    #nomeRaccolta;

    constructor(nome, prezzo, quantita, nomeRaccolta) {
        super("bustina di figurine", nome, prezzo, quantita);
        this.#nomeRaccolta = nomeRaccolta;
    }

    toString() {
        return super.toString().replace("Articolo", "Bustina di figurine").replace("}", "\n  ") +
            `Nome della raccolta: ${this.#nomeRaccolta}\n}`;
    }

    apri() {
        console.log("Ho aperto la bustina di figurine...");
    }
}

// La classe Edicola è il "controllore" di tutte queste classi
class Edicola {
    #vetrinaProdotti;

    constructor(vetrinaProdotti) {
        this.#vetrinaProdotti = vetrinaProdotti;
    }

    get vetrinaProdotti() {
        return this.#vetrinaProdotti;
    }

    toString() {
        let contenutoVetrina = "Contenuto della vetrina: {";
        for (const prodotto in this.#vetrinaProdotti) {
            contenutoVetrina += "\n" + prodotto;
        }
        contenutoVetrina += "\n}";
        return contenutoVetrina;
    }

    compraProdotto(nomeProdotto, numPezzi) {
        for (const prodotto in this.#vetrinaProdotti) {
            if (prodotto.nome == nomeProdotto){
                prodotto.compra(numPezzi);
                break;
            }
        }
    }
}

/*
    Come si vede, il codice si può riutilizzare tranquillamente, ma soprattutto
    le varie funzionalità aggiuntive sono state implementate creando nuove
    entità, per evitare di "distruggere" il codice collaudato inizialmente
*/

// Main
function main() {
    const divOutput = document.getElementById("divOutput");

    divOutput.style.display = "block";

    let edicola = new Edicola(
        [
            new Rivista("Computer Idea", 1.50, 20, 50, "Informatica"),
            new Giornale("Gazzetta di Parma", 1.70, 40, 45, "Parma"),
            new BustinaFigurine("Amici cucciolotti", 0.50, 50, "Amici Cucciolotti 2024"),
            new Libro("Anime Scalze", 10.00, 5, 224, "Fabio Geda")
        ]
    );

    const pOutput = document.getElementById("output");

    pOutput.innerText = `${edicola}`;

    edicola.compraProdotto("Gazzetta di Parma", 2);
    edicola.compraProdotto("Computer Idea", 5);

    pOutput.innerText += `\nHo comprato: 2 "Gazzette di Parma"; 5 riviste "Computer Idea"`
        + ` e un libro "Anime Scalze"...\n\n${edicola}\n\nNella console ==> Sto sfogliando il giornale...\n`;
}

function mostraCodice() {
    const divCodice = document.getElementById("divCodice");
    const txtCodice = document.getElementById("codice");

    divCodice.style.display = "block";

    txtCodice.innerText = `// Classe Articolo: la "base" per le altre classi che la specializzano
    class Articolo {
        // Nota: "_" indica che il membro è protected!
        _tipo;
        _nome;
        _prezzo;
        _quantita;
        _disponibile;
    
        constructor(tipo, nome, prezzo, quantita) {
            this._tipo = tipo;
            this._nome = nome;
            this._prezzo = (prezzo < 0.0 ? -prezzo : prezzo);
            this._quantita = (quantita < 0 ? -quantita : quantita);
            this._disponibile = (this._quantita == 0 ? false : true);
        }
    
        get nome() {
            return this._nome;
        }
    
        toString() {
            return \`Articolo: {\n  Tipo: \${this._tipo}\n  Nome: \${this._nome}\n  \` +
                \`Prezzo in Euro: \${this._prezzo.toFixed(2)}\n  Quantità: \` +
                \`\${this._quantita}\n  Disponibile: \${(this._disponibile ? "sì" : "no")}\n}\`;
        }
    
        compra(numPezzi) {
            if (this._disponibile && this._quantita >= numPezzi) {
                this._quantita -= numPezzi;
            }
    
            if (this._quantita == 0) {
                this._disponibile = false;
            } else {
                this._disponibile = true;
            }
        }
    }
    
    class Lettura extends Articolo {
        #numeroPagine;
    
        constructor(tipo, nome, prezzo, quantita, numeroPagine) {
            super(tipo, nome, prezzo, quantita);
            this.#numeroPagine = (numeroPagine < 0 ? -numeroPagine : numeroPagine);
        }
    
        toString() {
            let classname = this._tipo;
            classname[0].toUpperCase();
            return super.toString().replace("Articolo", classname).replace("}", "\n  ") +
                \`Numero di pagine: \${this.#numeroPagine}\n}\`;
        }
    
        sfoglia(){
            console.log("Sto sfogliando...");
        }
    }
    
    /*
        Classi che specializzano Articolo, aggiungendo funzionalità
        senza modificare la superclasse. Le prime tre specializzano
        un sottotipo di Articolo, ovvero Lettura, per espanderne
        le funzionalità
    */
    class Libro extends Lettura {
        #autore;
    
        constructor(nome, prezzo, quantita, numeroPagine, autore) {
            super("libro", nome, prezzo, quantita, numeroPagine);
            this.#autore = autore;
        }
    
        toString() {
            return super.toString() + \`Autore: \${this.#autore}\n}\`;
        }
    
        sfoglia(){
            console.log("Sto sfogliando il libro...");
        }
    }
    
    class Rivista extends Lettura {
        #genere;
    
        constructor(nome, prezzo, quantita, numeroPagine, genere) {
            super("rivista", nome, prezzo, quantita, numeroPagine);
            this.#genere = genere;
        }
    
        toString() {
            return super.toString() + \`Genere: \${this.#genere}\n}\`;
        }
    
        sfoglia(){
            console.log("Sto sfogliando la rivista...");
        }
    }
    
    class Giornale extends Lettura {
        #localita;
    
        constructor(nome, prezzo, quantita, numeroPagine, localita) {
            super("giornale", nome, prezzo, quantita, numeroPagine);
            this.#localita = localita;
        }
    
        toString() {
            return super.toString() + \`Località: \${this.#localita}\n}\`;
        }
    
        sfoglia(){
            console.log("Sto sfogliando il giornale...");
        }
    }
    
    // BustinaFigurine specializza Articolo, il tipo "base" di prodotto
    class BustinaFigurine extends Articolo {
        #nomeRaccolta;
    
        constructor(nome, prezzo, quantita, nomeRaccolta) {
            super("bustina di figurine", nome, prezzo, quantita);
            this.#nomeRaccolta = nomeRaccolta;
        }
    
        toString() {
            return super.toString().replace("Articolo", "Bustina di figurine").replace("}", "\n  ") +
                \`Nome della raccolta: \${this.#nomeRaccolta}\n}\`;
        }
    
        apri() {
            console.log("Ho aperto la bustina di figurine...");
        }
    }
    
    // La classe Edicola è il "controllore" di tutte queste classi
    class Edicola {
        #vetrinaProdotti;
    
        constructor(vetrinaProdotti) {
            this.#vetrinaProdotti = vetrinaProdotti;
        }
    
        get vetrinaProdotti() {
            return this.#vetrinaProdotti;
        }
    
        toString() {
            let contenutoVetrina = "Contenuto della vetrina: {";
            for (const prodotto in this.#vetrinaProdotti) {
                contenutoVetrina += "\n" + prodotto;
            }
            contenutoVetrina += "\n}";
            return contenutoVetrina;
        }
    
        compraProdotto(nomeProdotto, numPezzi) {
            for (const prodotto in this.#vetrinaProdotti) {
                if (prodotto.nome == nomeProdotto){
                    prodotto.compra(numPezzi);
                    break;
                }
            }
        }
    }
    
    /*
        Come si vede, il codice si può riutilizzare tranquillamente, ma soprattutto
        le varie funzionalità aggiuntive sono state implementate creando nuove
        entità, per evitare di "distruggere" il codice collaudato inizialmente
    */
    
    // Main
    function main() {
        const divOutput = document.getElementById("divOutput");
    
        divOutput.style.display = "block";
    
        let edicola = new Edicola(
            [
                new Rivista("Computer Idea", 1.50, 20, 50, "Informatica"),
                new Giornale("Gazzetta di Parma", 1.70, 40, 45, "Parma"),
                new BustinaFigurine("Amici cucciolotti", 0.50, 50, "Amici Cucciolotti 2024"),
                new Libro("Anime Scalze", 10.00, 5, 224, "Fabio Geda")
            ]
        );
    
        const pOutput = document.getElementById("output");
    
        pOutput.innerText = \`\${edicola}\`;
    
        edicola.compraProdotto("Gazzetta di Parma", 2);
        edicola.compraProdotto("Computer Idea", 5);
    
        pOutput.innerText += \`\nHo comprato: 2 "Gazzette di Parma"; 5 riviste "Computer Idea"\`
        + \` e un libro "Anime Scalze"...\n\n\${edicola}\n\nNella console ==> Sto sfogliando il giornale...\n\`;
    }
    
    function mostraCodice() {
        const divCodice = document.getElementById("divCodice");
        const txtCodice = document.getElementById("codice");

        divCodice.style.display = "block";

        // txtCodice.innerText = [Codice JS];
    }`;
}