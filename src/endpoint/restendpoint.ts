export const restendpoint = {
    base:'https://192.168.1.86:3033/',//'https://sadbackendgoogledrive.onrender.com/',//'https://sadbackendgoogledrive.onrender.com/',//'https://192.168.1.86:3033/',
    usuario:{
        lista:'auth/listaauth',
        login:'auth/login',
        register:'auth/register',
        buscaObraSegunUsuario:'auth'
    },
    obra:{
        crea:'obra/crea',
        descargarplantilla:'obra/plantilla/descargaplantilla',
        listbyuser:'obra/listbyuser',
        buscaobrabyId:'obra/obraById'
    },
    valorizacion:{
        creaPeriodoValorizacion:"valorizacion/creaperiodovalorizacion",
        agregaevidenciafotografica:"valorizacion/agregaevidenciafotografica",
        lista:'valorizacion/lista',
        listaValorizacionByobraid:'valorizacion/listaValorizacionByobraid',
        
        
        generaseparadoresconindice:'valorizacion/generaseparadoresconindice',
        descargaseparadores:'valorizacion/descargaseparadores',
        descargaconsolidado:'valorizacion/descargaconsolidado',
        consultas:'valorizacion/consultas',
        actualizaevidenciafotografica:'valorizacion/actualizaevidenciafotografica',
        comprimecarpeta:'valorizacion/comprimecarpeta'
        
    },
    panelfotografico:{
        listafotos:'panelfotografico/listafotos',
        creafoto:'panelfotografico/creafoto',
        listabyfilename:'panelfotografico/pictures',
        listabyid:'panelfotografico',
        deletebyid:'panelfotografico',
        actualizabyid:'panelfotografico',
        generapanelfotografico:'panelfotografico/generapanelfotografico',
        findValoIdByObraIdAndValoSeleccionada:'panelfotografico/findValoIdByObraIdAndValoSeleccionada',
        listafotosbyidvalorizacion:'panelfotografico/listafotosbyidvalorizacion'
    },
    antesedentesfotograficos:{
        listaAntesedentesFotograficosByPanelFotograficoId:'antesedentesfotograficos/listaAntesedentesFotograficosByPanelFotograficoId',
        insertantesedente:'antesedentesfotograficos/insertantesedente',
        listabyUsuarioObraValorizacion:'/antesedentesfotograficos/pictures'
    }
    
}
