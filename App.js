Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc2/doc/">App SDK 2.0rc2 Docs</a>'},
    launch: function() {
         //var context = this.getContext();
         //Display the current workspace name
        //this._displayContextValue('Workspace: ' + context.getWorkspace().Name);
        
        Ext.create('Rally.data.wsapi.Store', {
                        model: 'user',
                        autoLoad: true,
                        listeners: {
                            load: this._onDataLoaded,
                            scope: this
                        },
                        filters: [{property:'UserName',operator:'contains',value:'@'}],
                        fetch: ['UserName', 'UserPermissions', 'Tasks', 'SubscriptionAdmin', 'TeamMemberships'],
                        limit: Infinity,
                        sorters: [{property: 'UserName',direction: 'ASC'}]
                    });
        
    },
    
     _onDataLoaded: function(store, data) {
        var info = [];
        var context = this.getContext();
        var workspaceRef = context.getWorkspace()._ref;
        this._displayContextValue('Workspace: ' + context.getWorkspace().Name);
        _.each(data, function(record){
            info.push(record.get('UserName') + ' Sub Admin? ' + record.get('SubscriptionAdmin') + '<br />');
        });
        this._displayContextValue(info);
     },
     
     _displayContextValue: function(value) {
        this.add({
            xtype: 'component',
            html: value
        });
    }
});
