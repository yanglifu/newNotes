
// this call 的用法 1
var pet = {
	words:'...',
	speak:function(say){
		console.log(say+' '+this.words)
	}
}

var dog = {
	words:'wang'
}

pet.speak.call(dog,'speak')



// this call 的用法 2

function pets(words){
	this.words = words;
	this.speak = function(){
		console.log(this.words)
	}
}

function dogs(words){
	pets.call(this,words);
}

var dogs = new dogs('wang')

dogs.speak();


