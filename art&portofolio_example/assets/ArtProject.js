const STATES = {
    OPEN: "OPEN",
    OPEN_FOR_BACKERS: "OPEN_FOR_BACKERS",
    FUNDED: "FUNDED",
    IN_PROGRESS: "IN_PROGRESS",
    CLOSED: "CLOSED"
};
$$.asset.describe("ArtProject", {
    public: {
        alias: "string:alias",
        creator: "string",
        shares: "map",
        state: "string",
        result: "string:url"
    },
    init: function(alias, creator){
        if(!!this.creator){
            return false;
        }

        this.alias = alias;
        this.creator = creator;
        this.shares = {creator: 100};
        this.state = STATES.OPEN;

        return true;
    },
    transferShares: function(amount, sender, receiver){
        let avaibleShares = this.verifyBacker(sender);

        if(!avaibleShares || avaibleShares < amount){
            return false;
        }

        if(!this.shares[receiver]){
            this.shares[receiver] = 0;
        }

        this.shares[receiver] += amount;
        this.shares[sender] -=amount;

        return true;
    },
    verifyBacker: function(backer){
        return this.shares[backer];
    },
    listBackers: function(){
        return Object.keys(this);
    },
    changeState: function(state){
        if(!STATES[state]){
            return false;
        }

        this.state = state;
    },
    setResult: function(result){
        this.result = result;
    }
});
