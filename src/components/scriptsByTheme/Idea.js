const Idea = ({totalSelection}) => {
    console.log(totalSelection);
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

    if (opcionesElegidasParsed.detailModalNew !== undefined) {
        //declarar funcion
        detailModalFunction = `function detalleDeProductoModal(){
    
            let paymentsInModal = opcionesElegidasParsed.detailModalNew;
        
            for (const paymentName in paymentsInModal) {
                console.log(paymentName);
                if (paymentsInModal[paymentName].length > 0){
        
                    let paymentIdSelector = paymentsInModal[paymentName][0].idSelector;
                    console.log(paymentIdSelector);
                    $(paymentIdSelector).find("h6.mb-3:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box").eq(0).find("div").remove();

        
                    let price = $("#price_display").text().replace(/[$.]+/g,"");
                    let newPrice = parseFloat(price).toFixed(2);
                    let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                
                    paymentsInModal[paymentName].forEach((box) => {
        
                        let valorDeCuota = (newPrice/box.numberInstallment).toFixed(2);
                        valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
                        var nuevaCajaDeCuotas = '';
        
        
                        if (box.interest === "false"){
                            nuevaCajaDeCuotas = '<div data-installments="'+box.id+'"><h4 class="font-weight-normal mb-1">'+box.numberInstallment+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+box+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6><div class="mb-3"></div><div class="divider"></div></div>';
                        }
        
                        else{
                            nuevaCajaDeCuotas = '<div data-installments="'+box.id+'"><h4 class="font-weight-normal mb-1">'+box.numberInstallment+' cuotas <span>con interés</span></h4><h6 class="font-weight-normal mb-2"><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6><div class="mb-3"></div><div class="divider"></div></div>';
                        }
        
                        $(paymentIdSelector).find("h6.mb-3:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box").eq(0).append(nuevaCajaDeCuotas); 
                        
                        box.images.forEach(img => {
                            $(paymentIdSelector).find("h6.mb-3:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box").eq(0).find("div[data-installments='" +box.id.toString()+"'] h6+.mb-3 ").eq(0).append('<span><img src="'+img.image+'" data-src="'+img.image+'" class="card-img card-img-big lazyloaded" alt="'+img.name+'"></span>');
                        });
                        
                    });
        
                    //CAJA DE 1 CUOTA
                    let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6><div class="divider"></div></div>';
        
                    $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box").eq(0).append(cajaDe1cuota);
            
                }
            }
        };`;

        //declarar ejecucion de funcion
        detailModalExecution1 = `detalleDeProductoModal();`; 
        detailModalExecution2 = `LS.registerOnChangeVariant(detalleDeProductoModal);`;
    }

    if (opcionesElegidasParsed.itemProducts !== undefined) {
        //declarar funcion
        itemsFunction = `function cambiarLeyendaEnItem(item){
                let price = item.find(".js-price-display").text().replace(/[$.]+/g,"");
                price = parseFloat(price).toFixed(2);
            
            
                if (opcionesElegidasParsed.itemProducts.length > 0) {
            
                if (item.find(".js-max-installments-container").length) {
                    item.find(".js-max-installments-container").each(function(){
                    $(this).remove();
                    });
                }
                
                $(opcionesElegidasParsed.itemProducts).each(function(){
            
                    if ($(this)[0].typefield === "installments") {
                        let numeroDeCuota = $(this)[0].installments;
                        let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                        valorDeCuota = formatterAR.format(valorDeCuota);
                        const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">$'+ valorDeCuota +'</span></span></span></div>';
            
                        item.find(".item-description").append(cuotaCustomItem);
                    }
            
                    if ($(this)[0].typefield === "discount") {
                        let numeroDeDescuento = $(this)[0].discountPercentage;
                        let paymentMethod = $(this)[0].paymentMethod;
                        let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                        precioConDescuento = formatterAR.format(precioConDescuento);
                        const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">$'+ paymentMethod +'</span></span></span></div>';
                
                        item.find(".item-description").append(cuotaCustomItem);
                    }
            
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
        //declarar funcion
        detailMainFunction = `    function cambiarLeyendaPrincipalEnDetalle(){
        
            let detailMain = opcionesElegidasParsed.detailMain;
        
            let precioHTML = $("#price_display").text().trim().length;
            
            if (precioHTML > 1){
                let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
                price = parseFloat(price).toFixed(2);
                
                
                if (detailMain.length > 0) {
    
                    const discountIsConfigurated = detailMain.some((element) => {
                        return element.typefield === "discount";
                    });
    
                    const installmentsIsConfigurated = detailMain.some((element) => {
                        return element.typefield === "installments";
                    });
        
                    //Remove actual discounts
                    if (discountIsConfigurated){                    
                        $("#single-product .js-product-payments-container span.col-12.mb-2:not('.js-max-installments-container')").each(function(){
                            $(this).remove();
                        });
                    }
                    
                    //Remove actual installments
                    if (installmentsIsConfigurated){                    
                        $("#single-product .js-product-payments-container span.js-max-installments-container").each(function(){
                            $(this).remove();
                        });
                    }
                
                    if (discountIsConfigurated){ 
                        $(detailMain).each(function(){
                            if ($(this)[0].typefield === "discount") {
                                let numeroDeDescuento = $(this)[0].discountPercentage;
                                let paymentMethod = $(this)[0].paymentMethod;
                                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                                precioConDescuento = formatterAR.format(precioConDescuento);
                                const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12  mb-2" style="display: block;"><span class="float-left mr-2"><svg class="svg-inline--fa fa-lg svg-icon-accent float-left" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM48 64h480c8.8 0 16 7.2 16 16v48H32V80c0-8.8 7.2-16 16-16zm480 384H48c-8.8 0-16-7.2-16-16V224h512v208c0 8.8-7.2 16-16 16zm-336-84v8c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v8c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12zm160-166H32v-41h512v41z"></path></svg></span><span class="js-max-installments"><strong>'+ numeroDeDescuento +'%</strong> de descuento con <strong>'+ paymentMethod +'</strong></span></span>';
                                $("#single-product a#btn-installments").before(leyenda);
                            }
                        });
                    }
    
                            
                    if (installmentsIsConfigurated){ 
                        $(detailMain).each(function(){
                            if ($(this)[0].typefield === "installments") {
                                let numeroDeCuota = $(this)[0].installments;
                                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                                valorDeCuota = formatterAR.format(valorDeCuota);
                                let paymentMethod = $(this)[0].paymentMethod;
    
                                var leyenda = '';
    
                                if (paymentMethod === ""){
                                    leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12  mb-2" style="display: block;"><span class="float-left mr-2"><svg class="svg-inline--fa fa-lg svg-icon-accent float-left" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM48 64h480c8.8 0 16 7.2 16 16v48H32V80c0-8.8 7.2-16 16-16zm480 384H48c-8.8 0-16-7.2-16-16V224h512v208c0 8.8-7.2 16-16 16zm-336-84v8c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v8c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12zm160-166H32v-41h512v41z"></path></svg></span><span class="js-max-installments"><strong>'+ numeroDeCuota +'</strong> cuotas sin interés <strong>$'+ valorDeCuota +'</strong></span></span>';

                                } else{
                                    leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12  mb-2" style="display: block;"><span class="float-left mr-2"><svg class="svg-inline--fa fa-lg svg-icon-accent float-left" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM48 64h480c8.8 0 16 7.2 16 16v48H32V80c0-8.8 7.2-16 16-16zm480 384H48c-8.8 0-16-7.2-16-16V224h512v208c0 8.8-7.2 16-16 16zm-336-84v8c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v8c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12zm160-166H32v-41h512v41z"></path></svg></span><span class="js-max-installments"><strong>'+ numeroDeCuota +'</strong> cuotas sin interés <strong>$'+ valorDeCuota +' con '+ paymentMethod +'</strong></span></span>';
                                }
                        
                                if ($("#single-product .js-product-payments-container > span.col-12.mb-2").length){
                                    $("#single-product .js-product-payments-container > span.col-12.mb-2").eq(0).before(leyenda);
                                } else{
                                    $("#single-product a#btn-installments").before(leyenda);
                                }
                            }
                        });
                    }
                        
                    }
            }
            
        }`;

        detailMainExecution1 = `cambiarLeyendaPrincipalEnDetalle()`;
        detailMainExecution2 = `LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle)`;
    }

    if (opcionesElegidasParsed.cart !== undefined) {
        //declarar funcion
        cartFunction = `function leyendaEnCarrito(){
    
            let price = document.querySelector(".js-cart-total").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
            let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
            $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
            
            if (opcionesElegidasParsed.cart.length > 0) {
                $(opcionesElegidasParsed.cart).each(function(){
            
                if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].discountPercentage;
                    let paymentMethod = $(this)[0].paymentMethodInput;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con<span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
            
                    $("#custom-cart-text").append(leyenda);
                }
            
                if ($(this)[0].typefield === "installments") {
                    let numeroDeCuota = $(this)[0].installments;
                    let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                    valorDeCuota = formatterAR.format(valorDeCuota);
            
                    const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
            
                    $("#custom-cart-text").append(leyenda);
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
    
        observer.observe(document.querySelector("#modal-cart .js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
        });`;
    }


    return(`<!--Inicio de: cuotas custom por APP-->
    <script>
    //Idea
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
            })
        }
    });

    ${cartExecution}

    </script>
    <style>
    .js-max-installments-container:not(.cuotas-custom-ts){
        display: none!important;
    }
    </style>
<!--Fin de: cuotas custom por APP-->`
    )
};

export default Idea;