require.config({        
    baseUrl: 'scripts/lib',        
    paths: {},        
    shim: {}    
});
// load AMD module main.ts (compiled to main.js)
require(['main'],(Main:any) => {
    var main = new Main();        
    main.run();
});