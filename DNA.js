function newChar() {
    var c = floor(random(63, 123))
    if (c === 63) c = 32
    if (c === 64) c = 46

    return String.fromCharCode(c)
}

class DNA {
    constructor(num) {
        this.genes = []
        this.fitness = 0.0
        this.size = num
        for (let i = 0; i < num; i++) {
            this.genes[i] = newChar()
        }
    }

    getFrase() {
        var frase = ""
        this.genes.map((value)=>{
            frase += value
        })

        return frase
    }

    crossover(partiner) {
        var child = new DNA(this.size)
        for (let i = 0; i < this.size; i++) {
            let ran = -1 + int(random(2) * 2)
            if (ran) {
                child.genes[i] = partiner.genes[i]
            } else {
                child.genes[i] = this.genes[i]
            }
            
        }
        return child
    }

    mutate(mutateRate){
        let mutation = random(2)
        if (mutateRate >= mutation) {
            let i = floor(random(this.size))
            this.genes[i] = newChar()
        }

    }

}