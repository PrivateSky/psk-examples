$$.transaction.describe("PortofolioManagement", {
    create: function(alias, owner){
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', alias);

        portofolio.init(alias, owner);

        try{
            transaction.add(portofolio);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Portofolio creating failed!");
            return;
        }

        this.return(null, alias);
    },

    addProject: function(portofolioAlias, projectAlias, key){
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', portofolioAlias);

        let result = portofolio.addProject(projectAlias, key);

        try{
            transaction.add(portofolio);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Failed to save portofolio update!");
            return;
        }

        this.return(null, result);
    },

    removeProject: function(portofolioAlias, projectAlias){
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', portofolioAlias);

        let result = portofolio.removeProject(projectAlias);

        try{
            transaction.add(portofolio);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Failed to save portofolio update!");
            return;
        }

        this.return(null, result);
    },

    hasProject: function(portofolioAlias, projectAlias){
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', portofolioAlias);

        let result = portofolio.hasProject(projectAlias);

        this.return(null, result);
    },

    listProjects: function(portofolioAlias, projectAlias){
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', portofolioAlias);

        let result = portofolio.listProjects(projectAlias);

        this.return(null, result);
    },

    transfer: function(portofolioAlias, owner, newOwner){
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', portofolioAlias);

        let result = portofolio.transfer(owner, newOwner);

        try{
            transaction.add(portofolio);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Failed to save portofolio transfer!");
            return;
        }

        this.return(null, result);
    }
});
