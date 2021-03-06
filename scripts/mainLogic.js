document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);

let app = new Vue({
    el: '#app',
    data: {
        name: 'World',
        libName: 'Vue.js',
        inputText: '',
        translatedText: '',
        paragraphAmount: '1',
        isLoading: false,
        output: [ ]
    },
    methods: {
        translate: function () {
            let step = this.inputText.split(/[aeiouäöü]+/).join('ö');
            step = step.split(/[AEIOUÄÖÜ]+/).join('Ö');
            step = step.split('y').join('ü');
            this.translatedText = step.split('Y').join('Ü');
        },
        getParagraphs: function () {
            this.isLoading = true;
            if(this.paragraphAmount < 0 || this.paragraphAmount > 50){
                this.paragraphAmount = 1;
            }
            let url = "https://baconipsum.com/api/?type=all-meat&paras="+ this.paragraphAmount + "&start-with-lorem=1";
            //let url = 'https://cors-anywhere.herokuapp.com/' + "https://makesum.com/libraries/generate_ipsum/99/" + this.paragraphAmount + "/0";
            fetch(url)
                .then((response) => {
                    return response.json();
                })
                .then((myJson) => {
                    let rawOutput ="";
                    //console.log(myJson);
                    for(let i = 0; i < this.paragraphAmount; i++){
                        let step = myJson[i].split(/[aeiouäöü]+/).join('ö');
                        step = step.split(/[AEIOUÄÖÜ]+/).join('Ö');
                        step = step.split('y').join('ü');
                        myJson[i] = step.split('Y').join('Ü');
                    }
                    this.output = myJson;
                    this.isLoading = false;
                }).catch(() => this.isLoading = false);

        }
    }
});
