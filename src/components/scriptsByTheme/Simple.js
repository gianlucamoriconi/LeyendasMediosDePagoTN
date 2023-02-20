const Simple = ({totalSelection}) => {
    console.log(totalSelection);
    const currentDate = new Date(Date.now()).toLocaleDateString();

    const opcionesElegidasJSON = JSON.stringify(totalSelection);
    let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);

    let detailModalFunction = "";
    let detailModalExecution1 = "";
    let detailModalExecution2 = "";  

    let detailMainFunction = "";
    let detailMainExecution1 = "";
    let detailMainExecution2 = "";  

    let itemsFunction = "";
    let itemsExecution1 = "";
    let itemsExecution2 = "";

    let cartFunction = "";
    let cartExecution = "";

    let styleItems = "";
    let styleDetailMain = "";
    

    if (opcionesElegidasParsed.detailModalNew !== undefined) {
        //declarar funcion
        detailModalFunction = `function detalleDeProductoModal(){
    
            let paymentsInModal = opcionesElegidasParsed.detailModalNew;
        
            for (const paymentName in paymentsInModal) {
                
                if (paymentsInModal[paymentName].length > 0){
        
                    let paymentIdSelector = paymentsInModal[paymentName][0].idSelector;
                    $(paymentIdSelector).find(".box-title:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box-container .pull-left.full-width.border-box").eq(0).find(".installments-container").remove();

        
                    let price = $("#price_display").text().replace(/[$.]+/g,"");
                    let newPrice = parseFloat(price).toFixed(2);
                    let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                
                    paymentsInModal[paymentName].forEach((box) => {
        
                        let valorDeCuota = (newPrice/box.numberInstallment).toFixed(2);
                        valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
                        var nuevaCajaDeCuotas = '';
        
        
                        if (box.interest === "false"){
                            nuevaCajaDeCuotas = '<div class="installments-container" data-installment-id="'+box.id+'"><h5 class="subtitle">'+box.numberInstallment+' cuotas <span class="font-medium text-uppercase">sin interés</span> de <span class="js-modal-installment-price text-primary weight-strong" data-installment="'+box.id+'"> $'+valorDeCuota+'</span></h5><div class="legal-info p-bottom-half"><span class="m-right-quarter"><span>CFT: </span><span class="weight-strong">0,00%</span></span><span class="m-right-quarter"><span>Total: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span><span class="m-right-quarter"><span>En 1 pago: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span></div><div class="flags-container"></div><div class="divider-dotted"></div></div>';
                        }
        
                        else{
                            nuevaCajaDeCuotas = '<div class="installments-container" data-installment-id="'+box.id+'"><h5 class="subtitle">'+box.numberInstallment+' cuotas <span class="font-medium text-uppercase">con interés</span></h5><div class="legal-info p-bottom-half"><span class="m-right-quarter"><span>O en 1 pago: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span></div><div class="flags-container"></div><div class="divider-dotted"></div></div>';
                        }
        
                        $(paymentIdSelector).find(".box-title:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box-container .pull-left.full-width.border-box").eq(0).append(nuevaCajaDeCuotas); 
                        
                        box.images.forEach(img => {
                            $(paymentIdSelector).find(".box-title:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box-container .pull-left.full-width.border-box").eq(0).find("div.installments-container[data-installment-id='"+box.id.toString()+"'] .flags-container").eq(0).append('<span class="installments-card"><img src="'+img.image+'" data-src="'+img.image+'" class="card-img card-img-big lazyloaded" alt="'+img.name+'"></span>');
                        });
                        
                    });
        
                }
            }
        };`;

        //declarar ejecucion de funcion
        detailModalExecution1 = `detalleDeProductoModal();`; 
        detailModalExecution2 = `LS.registerOnChangeVariant(detalleDeProductoModal);`;
    }

    if (opcionesElegidasParsed.itemProducts !== undefined) {

        let installmentsItemFor = "";
        let discountItemFor = "";

        const itemProducts = opcionesElegidasParsed.itemProducts;

        const installmentsIsConfigurated = itemProducts.some(element => {
            return element.typefield === "installments";
        });
    
        const discountIsConfigurated = itemProducts.some(element => {
            return element.typefield === "discount";
        });
    
    
    
        if (installmentsIsConfigurated === true) {
            styleItems = `
    .item .js-max-installments-container:not(.cuotas-custom-ts){
        display: none!important;
    }`;
            installmentsItemFor = `if ($(this)[0].typefield === "installments") {
                        let numeroDeCuota = $(this)[0].installments;
                        let paymentMethod = $(this)[0].paymentMethod;
                        let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                        valorDeCuota = formatterAR.format(valorDeCuota);
                        let cuotaCustomItem = '';
                        

                        if (paymentMethod !== ""){
                            cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts js-max-installments-custom"> <div class="js-max-installments item-installments label-line m-top-quarter"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés con '+paymentMethod+' de <strong class="js-installment-price installment-price">$'+ valorDeCuota +'</strong></div></div>';
                            item.find(".item-price-container").append(cuotaCustomItem);

                        } else{
                            cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts js-max-installments-custom"> <div class="js-max-installments item-installments label-line m-top-quarter"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price">$'+ valorDeCuota +'</strong></div></div>';
                            item.find(".item-price-container").append(cuotaCustomItem);

                        }

                    }`;
        }
    
    
        if (discountIsConfigurated === true) {
            discountItemFor = `if ($(this)[0].typefield === "discount") {
                        let numeroDeDescuento = $(this)[0].discountPercentage;
                        let paymentMethod = $(this)[0].paymentMethod;
                        let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                        precioConDescuento = formatterAR.format(precioConDescuento);
                        const cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts js-max-installments-custom"> <div class="js-max-installments item-installments label-line m-top-quarter"><strong class="js-installment-amount installment-amount">'+ numeroDeDescuento +'%</strong> de descuento con <strong class="js-installment-price installment-price">'+ paymentMethod +'</strong></div></div>';

                        item.find(".item-price-container").append(cuotaCustomItem);
                    }`;
        }


        //declarar funcion
        itemsFunction = `function cambiarLeyendaEnItem(item){
                const itemProducts = opcionesElegidasParsed.itemProducts;
                let price = item.find(".js-price-display").text().replace(/[$.]+/g,"");
                price = parseFloat(price).toFixed(2);
            
            
                if (opcionesElegidasParsed.itemProducts.length > 0) {
            
                if (item.find(".js-max-installments-container").length) {
                    item.find(".js-max-installments-container").each(function(){
                    $(this).remove();
                    });
                }
                
                $(opcionesElegidasParsed.itemProducts).each(function(){
                    ${installmentsItemFor}
                    ${discountItemFor}
                });
                }
            
            };`;


        //declarar ejecucion de funcion
        itemsExecution1 = `$(document).ready(function(){
            //Funcion de cambio
            function changeItemPayment(){
                $(".js-item-product").each(function() {
                    if (!$(this).find(".custom-cuotas-item").length){
                    let currentItem = $(this);
                    cambiarLeyendaEnItem(currentItem);
                    }
                });
            }

            //Ejecucion cuando el contenido carga
            changeItemPayment();

            //Ejecucion cuando hacen scroll
            window.addEventListener('scroll', function() {
                changeItemPayment();
            });
            
            //Ejecucion cuando cambian de variante
            LS.registerOnChangeVariant(function(){
                changeItemPayment();
            });
        });`;
        
        itemsExecution2 = `$("a.js-load-more").click(function(){
            setTimeout(function() {
                $(".js-item-product").each(function() {
                    let currentItem = $(this);
                    cambiarLeyendaEnItem(currentItem);
                });
            }, 2000);
        });`;

    }

    if (opcionesElegidasParsed.detailMain !== undefined) {

        let installmentsDetailMainFor= "";
        let discountDetailMainFor= "";

        const detailMain = opcionesElegidasParsed.detailMain;

        const installmentsIsConfigurated = detailMain.some(element => {
            return element.typefield === "installments";
        });
    
        const discountIsConfigurated = detailMain.some(element => {
            return element.typefield === "discount";
        });
    
    
        if (installmentsIsConfigurated === true) {
            styleDetailMain = `
    #single-product .js-max-installments-container:not(.cuotas-custom-ts){
        display: none!important;
    }`;

            installmentsDetailMainFor = `$("#single-product .js-product-payments-container .js-max-installments-container").each(function(){
                $(this).remove();
            });

            $(detailMain).each(function(){
                if ($(this)[0].typefield === "installments") {
                    let numeroDeCuota = $(this)[0].installments;
                    let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                    valorDeCuota = formatterAR.format(valorDeCuota);
                    let paymentMethod = $(this)[0].paymentMethod;

                    var leyenda = '';

                    if (paymentMethod === ""){
                        leyenda = '<div class="js-max-installments-container cuotas-custom-ts row-fluid"><div class="js-max-installments label-line label-featured d-inline-block"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price" data-value="'+ valorDeCuota +'">$'+ valorDeCuota +'</strong></div></div>';
                        
                    } else{
                        leyenda = '<div class="js-max-installments-container cuotas-custom-ts row-fluid"><div class="js-max-installments label-line label-featured d-inline-block"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés con '+ paymentMethod +' de <strong class="js-installment-price installment-price" data-value="'+ valorDeCuota +'">$'+ valorDeCuota +'</strong></div></div>';

                    }
            
                    if ($("#single-product .js-product-payments-container > div.m-bottom-half").length){
                        $("#single-product .js-product-payments-container > div.m-bottom-half").eq(0).append(leyenda);
                    } else{
                        $("#single-product a#btn-installments").before(leyenda);
                    }
                }
            });`;
        }
    
    
        if (discountIsConfigurated === true) {
            discountDetailMainFor = `$("#single-product .js-product-payments-container span.col-12.mb-2:not('.js-max-installments-container')").each(function(){
                    $(this).remove();
                });

                $(detailMain).each(function(){
                    if ($(this)[0].typefield === "discount") {
                        let numeroDeDescuento = $(this)[0].discountPercentage;
                        let paymentMethod = $(this)[0].paymentMethod;
                        let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                        precioConDescuento = formatterAR.format(precioConDescuento);
                        const leyenda = '<div class="span12 m-left-none m-bottom-half p-right-double"><span class="text-tertiary"><strong>'+ numeroDeDescuento +'% de descuento</strong> pagando con '+ paymentMethod +'</span></div>'
                        $("#single-product a#btn-installments").before(leyenda);
                    }
                });`;
        }


        //declarar funcion
        detailMainFunction = `function cambiarLeyendaPrincipalEnDetalle(){
        
            let detailMain = opcionesElegidasParsed.detailMain;
        
            let precioHTML = $("#price_display").text().trim().length;
            
            if (precioHTML > 1){
                let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
                price = parseFloat(price).toFixed(2);
                
                
                if (detailMain.length > 0) {
                    ${installmentsDetailMainFor}
                    ${discountDetailMainFor}
                }
            }
            
        }`;

        detailMainExecution1 = `cambiarLeyendaPrincipalEnDetalle()`;
        detailMainExecution2 = `LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle)`;
    }

    if (opcionesElegidasParsed.cart !== undefined) {
        //declarar funcion
        cartFunction = `function leyendaEnCarrito(){
    
            let price = $("#ajax-cart-details .js-cart-total").text().replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
            let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
            $("#ajax-cart-details .js-installments-cart-total").replaceWith(leyendaCarrito);
            
            if (opcionesElegidasParsed.cart.length > 0) {
                $(opcionesElegidasParsed.cart).each(function(){
            
                if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].discountPercentage;
                    let paymentMethod = $(this)[0].paymentMethod;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con<span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
            
                    $("#custom-cart-text").append(leyenda);
                }
            
                if ($(this)[0].typefield === "installments") {
                    let numeroDeCuota = $(this)[0].installments;
                    let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                    valorDeCuota = formatterAR.format(valorDeCuota);
                    let paymentMethod = $(this)[0].paymentMethod;
            
                    if (paymentMethod !== ""){
                        const leyenda = '<div style="" data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom font-body p-top-quarter clear-both text-right"><span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés con '+ paymentMethod +' de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
                        $("#custom-cart-text").append(leyenda);

                    } else{
                        const leyenda = '<div style="" data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom font-body p-top-quarter clear-both text-right"><span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
                        $("#custom-cart-text").append(leyenda);
                    }
                }
            
                });
            }
        
        };`;

        //declarar ejecucion de funcion
        cartExecution = `leyendaEnCarrito();
        
        const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                    leyendaEnCarrito();
                });
            }
        });
    
        observer.observe(document.querySelector("#ajax-cart-details .js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
        });`;
    }


    let styles = `<style>${styleItems + styleDetailMain}
</style>`;

    return(`
<!-- Inicio de: APP LEYENDAS - cambiar leyenda promocional medios de pago -->
<script>
    //Fecha de creación: ${currentDate}
    //Simple
    const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
    let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
    
    const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    
    ${detailModalFunction}
    ${detailMainFunction}
    ${itemsFunction}
    ${cartFunction}
    ${itemsExecution1}
    ${itemsExecution2}

    $(document).ready(function(){
        if (LS.product) {
            setTimeout(function (){
                
                //Leyenda principal
                ${detailMainExecution1}
                ${detailMainExecution2}

                //Modal
                ${detailModalExecution1}
                ${detailModalExecution2}
            });
        }
    });

    ${cartExecution}

</script>
${styles}
<!-- Fin de: APP LEYENDAS - cambiar leyenda promocional medios de pago -->`
    )
};

export default Simple;