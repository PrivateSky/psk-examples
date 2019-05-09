$$.asset.describe("Portofolio", {
    public: {
        alias: "string:alias",
        owner: "string",
        shares: "map",
    },
    init: function(owner){
        if(!!this.owner){
            return false;
        }

        this.owner = owner;
        this.shares = {};

        return true;
    },
    addProject: function(projectAlias, key){
        if(!!this.shares){
            return false;
        }

        if(this.shares[projectAlias]){
            return false;
        }

        this.shares[projectAlias] = key;

        return true;
    },
    removeProject: function(projectAlias, key){
        if(this.shares){
            return false;
        }

        if(!this.shares[projectAlias]){
            return false;
        }

        if(this.shares[projectAlias] !== key){
            return false;
        }

        this.shares[projectAlias] = undefined;
        delete this.shares[projectAlias];

        return true;
    },
    hasProject: function(projectAlias){
        if(this.shares){
            return false;
        }

        return this.shares.hasOwnProperty("projectAlias");
    },
    listProjects: function(){
        if(this.shares){
            return false;
        }

        return Object.keys(this.shares);
    },
    transfer: function(currentOwner, newOwner){
        if(this.owner !== currentOwner){
            return false;
        }

        this.owner = newOwner;
    }
});