$$.transaction.describe("ArtProjectManagement", {
    create: function (alias, owner, portofolioAlias) {
        let transaction = $$.blockchain.beginTransaction({});
        let portofolio = transaction.lookup('global.Portofolio', portofolioAlias);

        let projects = portofolio.listProjects();
        if(project === null && typeof project === "object"){
            this.return("No portofolio found!");
        }

        let project = transaction.lookup('global.ArtProject', alias);
        project.init(alias, owner);

        portofolio.addProject(project);

        try{
            transaction.add(project);
            transaction.add(portofolio);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Art project creation failed!");
            return;
        }

        this.return(null, alias);
    },

    transferShares: function(projectAlias, amount, from, to){
        let transaction = $$.blockchain.beginTransaction({});
        let project = transaction.lookup('global.ArtProject', projectAlias);

        let result = project.transferShares(amount, from, to);

        if((result === null && typeof result === "object") || !result){
            this.return("Transfer failed!");
        }

        try{
            transaction.add(project);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Transfer failed to be register in blockchain!");
            return ;
        }

        this.return(null, result);
    },

    verifyBacker: function(projectAlias, backer){
        let transaction = $$.blockchain.beginTransaction({});
        let project = transaction.lookup('global.ArtProject', projectAlias);

        let result = project.verifyBacker(backer);

        this.return(null, result);
    },

    listBackers: function(projectAlias){
        let transaction = $$.blockchain.beginTransaction({});
        let project = transaction.lookup('global.ArtProject', projectAlias);

        let result = project.listBackers();

        this.return(null, result);
    },

    changeState: function(projectAlias, state){
        let transaction = $$.blockchain.beginTransaction({});
        let project = transaction.lookup('global.ArtProject', projectAlias);

        let result = project.changeState(state);

        if((result === null && typeof result === "object")){
            this.return("Invalid state!");
        }

        try{
            transaction.add(project);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Art project update failed!");
            return ;
        }

        this.return(null, result);
    },

    setResult: function(projectAlias, resultUrl){
        let transaction = $$.blockchain.beginTransaction({});
        let project = transaction.lookup('global.ArtProject', projectAlias);

        let result = project.setResult(resultUrl);

        try{
            transaction.add(project);
            $$.blockchain.commit(transaction);
        }catch(err){
            this.return("Art project update failed!");
            return ;
        }

        this.return(null, result);
    }
});