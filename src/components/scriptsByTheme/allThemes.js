import { useContext } from 'react';
import { OptionsContextObject } from '../../context/optionsContextObject';

var detailModalFunction = "";
var detailModalExecution1 = "";
var detailModalExecution2 = "";  

var detailMainFunction = "";
var detailMainExecution1 = "";
var detailMainExecution2 = "";  

var itemsFunction = "";
var itemsExecution1 = "";
var itemsExecution2 = "";

var cartFunction = "";
var cartExecution = "";

const AmazonasSolid = () => {
    const { totalSelection } = useContext(OptionsContextObject);
    console.log(totalSelection);
    const opcionesElegidasJSON = JSON.stringify(totalSelection);
    let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);


    if (opcionesElegidasParsed.detailModalNew !== undefined) {
        //declarar funcion
        detailModalFunction = `function detalleDeProductoModal(){
    
            let paymentsInModal = opcionesElegidasParsed.detailModalNew;
        
            for (const paymentName in paymentsInModal) {
                
                if (paymentsInModal[paymentName].length > 1){
        
                    let paymentIdSelector = paymentsInModal[paymentName][0].idSelector;
                    $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).find("div").remove();

        
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
        
                        $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas); 
                        
                        box.images.forEach(img => {
                            $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).find("div[data-installments='" +box.id.toString()+"'] h6+.mb-3 ").eq(0).append('<span><img src="'+img.image+'" data-src="'+img.image+'" class="card-img card-img-big lazyloaded" alt="'+img.name+'"></span>');
                        });
                        
                    });
        
                    //CAJA DE 1 CUOTA
                    let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6><div class="divider"></div></div>';
        
                    $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);
            
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
                    const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
            
                    item.find(".item-description").append(cuotaCustomItem);
                    }
            
                    if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].discountPercentage;
                    let paymentMethod = $(this)[0].paymentMethod;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
            
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
        detailMainFunction = `function cambiarLeyendaPrincipalEnDetalle(){
        
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
                              const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';                        

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
                                    leyenda = '<span class="js-max-installments-container js-max-installments cuotas-ts col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.6,41.6H77.5C34.7,41.6,0,76.4,0,119.1v273.8c0,42.7,34.7,77.4,77.5,77.4h421c42.8,0,77.5-34.7,77.6-77.5V119.1C576.1,76.3,541.3,41.6,498.6,41.6z M203.8,386.1H98.5c-7.9,0-14.3-6.4-14.3-14.3c0-7.9,6.4-14.3,14.3-14.3h105.3c7.9,0,14.3,6.4,14.3,14.3S211.7,386.1,203.8,386.1z M218.1,245.5c0,7.9-6.4,14.3-14.3,14.3H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2 c0-7.9,6.4-14.3,14.3-14.3h105.3c7.9,0,14.3,6.4,14.3,14.3V245.5z M351.2,386.1H245.9c-7.9,0-14.3-6.4-14.3-14.3 c0-7.9,6.4-14.3,14.3-14.3h105.3c7.9,0,14.3,6.4,14.3,14.3S359.1,386.1,351.2,386.1z M498.6,386.1H393.3c-7.9,0-14.3-6.4-14.3-14.3 c0-7.9,6.4-14.3,14.3-14.3h105.2c7.9,0,14.3,6.4,14.3,14.3S506.4,386.1,498.6,386.1z M498.5,154.5h-42.1c-7.9,0-14.3-6.4-14.3-14.3 c0-7.9,6.4-14.3,14.3-14.3h42.1c7.9,0,14.3,6.4,14.3,14.3C512.8,148.1,506.4,154.5,498.5,154.5z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
                              
                                } else{
                                    leyenda = '<span class="js-max-installments-container js-max-installments cuotas-ts col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.6,41.6H77.5C34.7,41.6,0,76.4,0,119.1v273.8c0,42.7,34.7,77.4,77.5,77.4h421c42.8,0,77.5-34.7,77.6-77.5V119.1C576.1,76.3,541.3,41.6,498.6,41.6z M203.8,386.1H98.5c-7.9,0-14.3-6.4-14.3-14.3c0-7.9,6.4-14.3,14.3-14.3h105.3c7.9,0,14.3,6.4,14.3,14.3S211.7,386.1,203.8,386.1z M218.1,245.5c0,7.9-6.4,14.3-14.3,14.3H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2 c0-7.9,6.4-14.3,14.3-14.3h105.3c7.9,0,14.3,6.4,14.3,14.3V245.5z M351.2,386.1H245.9c-7.9,0-14.3-6.4-14.3-14.3 c0-7.9,6.4-14.3,14.3-14.3h105.3c7.9,0,14.3,6.4,14.3,14.3S359.1,386.1,351.2,386.1z M498.6,386.1H393.3c-7.9,0-14.3-6.4-14.3-14.3 c0-7.9,6.4-14.3,14.3-14.3h105.2c7.9,0,14.3,6.4,14.3,14.3S506.4,386.1,498.6,386.1z M498.5,154.5h-42.1c-7.9,0-14.3-6.4-14.3-14.3 c0-7.9,6.4-14.3,14.3-14.3h42.1c7.9,0,14.3,6.4,14.3,14.3C512.8,148.1,506.4,154.5,498.5,154.5z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +' pagando con '+ paymentMethod +'</span></span></span></span>';

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
    
            let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
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
    
        observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
        });`;
    }


    return(`<script>
    //AMAZONAS ICONOS GRUESOS
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

    </script>`
    )
};

const AmazonasLight = () => {
    const { totalSelection } = useContext(OptionsContextObject);
    console.log(totalSelection);
    const opcionesElegidasJSON = JSON.stringify(totalSelection);
    let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);


    if (opcionesElegidasParsed.detailModalNew !== undefined) {
        //declarar funcion
        detailModalFunction = `function detalleDeProductoModal(){
    
            let paymentsInModal = opcionesElegidasParsed.detailModalNew;
        
            for (const paymentName in paymentsInModal) {
                if (paymentsInModal[paymentName].length > 1){
            
                let paymentIdSelector = "";
                let cuotas = [];
            
                paymentsInModal[paymentName].forEach((box) => {
                    
                    cuotas.push({
                        cuota: box.numberInstallment,
                        interest: box.interest
                    });
                    paymentIdSelector = box.idSelector;
                });
            
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                    $(this).remove();
                });
            
                $("#price_display").each(function() {
                    let price = $(this).text().replace(/[$.]+/g,"");
                    let newPrice = parseFloat(price).toFixed(2);
                    let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                    let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                
                    for (i = 0; i < cuotas.length; i++) {
                        let valorDeCuota = (newPrice/cuotas[i].cuota).toFixed(2);
                        valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
            
                        let nuevaCajasDeCuotas = '';

                        if (cuotas[i].interest === "false"){
                            nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i].cuota+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                        }

                        else{
                            nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i].cuota+' cuotas <span>con interés</span></h4><h6 class="font-weight-normal mb-2"><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                        }

                        $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                    }
                
                
                    //CAJA DE 1 CUOTA
                    let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                    $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);      
            
                    console.log(paymentIdSelector);
                    console.log(cuotas);
                });
            
            
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
                    const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
            
                    item.find(".item-description").append(cuotaCustomItem);
                    }
            
                    if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].discountPercentage;
                    let paymentMethod = $(this)[0].paymentMethod;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
            
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
                                const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';    
    
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
                                    leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
                                } else{
                                    leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +' pagando con '+ paymentMethod +'</span></span></span></span>';
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
    
            let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
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
    
        observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
        });`;
    }


    return(`<script>
    //AMAZONAS ICONOS FINOS
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

    </script>`
    )
};

const Simple = () => {
    const { totalSelection } = useContext(OptionsContextObject);
    console.log(totalSelection);
    const opcionesElegidasJSON = JSON.stringify(totalSelection);
    let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);


    if (opcionesElegidasParsed.detailModalNew !== undefined) {
        //declarar funcion
        detailModalFunction = `function detalleDeProductoModal(){
    
            let paymentsInModal = opcionesElegidasParsed.detailModalNew;
        
            for (const paymentName in paymentsInModal) {
                
                if (paymentsInModal[paymentName].length > 1){
        
                    let paymentIdSelector = paymentsInModal[paymentName][0].idSelector;
                    $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).find("div").remove();

        
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
        
                        $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas); 
                        
                        box.images.forEach(img => {
                            $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).find("div[data-installments='" +box.id.toString()+"'] h6+.mb-3 ").eq(0).append('<span><img src="'+img.image+'" data-src="'+img.image+'" class="card-img card-img-big lazyloaded" alt="'+img.name+'"></span>');
                        });
                        
                    });
        
                    //CAJA DE 1 CUOTA
                    let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6><div class="divider"></div></div>';
        
                    $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);
            
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
                    const cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts"><div class="js-max-installments item-installments label-line m-top-quarter"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price">'+ valorDeCuota +'</strong></div></div>';
                    item.find(".item-price-container").append(cuotaCustomItem);
                    }
            
                    if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].discountPercentage;
                    let paymentMethod = $(this)[0].paymentMethod;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts"><div class="js-max-installments item-installments label-line m-top-quarter"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price">'+ numeroDeDescuento +'%</strong> con '+ paymentMethod +'</div></div>';

                    item.find(".item-price-container").append(cuotaCustomItem);
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
        detailMainFunction = `function cambiarLeyendaPrincipalEnDetalle(){
        
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
                        $("#single-product .js-product-payments-container .span12.m-left-none.m-bottom-half.p-right-double:not('.js-max-installments-container')").each(function(){
                            $(this).remove();
                        });
                    }
                    
                    //Remove actual installments
                    if (installmentsIsConfigurated){                    
                        $("#single-product .js-product-payments-container div.js-max-installments-container").each(function(){
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
                              const leyenda = '<div class="span12 m-left-none m-bottom-half cuotas-custom-ts p-right-double"><span class="text-tertiary"><strong>'+ numeroDeDescuento +'% de descuento</strong> pagando con '+ paymentMethod +'</span></div>';
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
                                    leyenda = '<div class="js-max-installments-container cuotas-custom-ts row-fluid"><div class="installments text-uppercase text-left-xs"><div class="js-max-installments label-line label-featured d-inline-block"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price">$'+ valorDeCuota +'</strong></div></div></div>';
                                } else{
                                    leyenda = '<div class="js-max-installments-container cuotas-custom-ts row-fluid"><div class="installments text-uppercase text-left-xs"><div class="js-max-installments label-line label-featured d-inline-block"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price">$'+ valorDeCuota +'</strong> pagando con '+ paymentMethod +'</div></div></div>';
                                }
                        
                                if ($("#single-product .js-product-payments-container > div.m-bottom-half .js-max-installments-container").length){
                                    $("#single-product .js-product-payments-container > div.m-bottom-half .js-max-installments-container").eq(0).before(leyenda);
                                } else{
                                    $("#single-product .js-product-payments-container > div.m-bottom-half").prepend(leyenda);
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
    
            let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
            let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total font-body p-top-quarter clear-both text-right"></div>';

            $("#ajax-cart-details .js-installments-cart-total").replaceWith(leyendaCarrito);
            
            if (opcionesElegidasParsed.cart.length > 0) {
                $(opcionesElegidasParsed.cart).each(function(){
            
                if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].discountPercentage;
                    let paymentMethod = $(this)[0].paymentMethodInput;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const leyenda = '<div style="" data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom font-body p-top-quarter clear-both text-right">O hasta <span class="js-cart-installments-amount">'+ numeroDeDescuento +'</span>% de descuento con <span class="js-cart-installments">'+ paymentMethod +'</span></div>';
                                        
                    $("#custom-cart-text").append(leyenda);
                }
            
                if ($(this)[0].typefield === "installments") {
                    let numeroDeCuota = $(this)[0].installments;
                    let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                    valorDeCuota = formatterAR.format(valorDeCuota);
                    const leyenda = '<div style="" data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="cuota-carrito-custom js-installments-cart-total font-body p-top-quarter clear-both text-right">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
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
    
        observer.observe(document.querySelector("#ajax-cart-details span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
        });`;
    }


    return(`<script>
    //Simple NEW
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
  
    #single-product .js-max-installments-container.cuotas-custom-ts {
        margin-bottom: 9px;
    }
  
    /*Las ocultamos de productos relacionados porque al cambiar de variante tenemos un issue y no podemos actualizar la leyenda*/
    section#related-products .js-max-installments-container {
        display: none;
    }
    </style>`
    )
};

const Idea = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                  $(this).remove();
                });
          
                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                
                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
          
          
                      let nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i]+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                      $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                  }
                
                
                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                  $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);      
          
                  console.log(paymentIdSelector);
                  console.log(cuotas);
                });
          
          
              }
            }
          }
        
        function cambiarLeyendaEnItem(item){
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
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
            });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
        let precioHTML = $("#price_display").text().trim().length;
        
        if (precioHTML > 1){
            let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
        
        
            if (opcionesElegidasParsed.detailMain.length > 0) {

                const discountIsConfigurated = opcionesElegidasParsed.detailMain.some((element) => {
                    return element.typefield === "discount";
                });

                const installmentsIsConfigurated = opcionesElegidasParsed.detailMain.some((element) => {
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
            
                $(opcionesElegidasParsed.detailMain).each(function(){
            
                    if (discountIsConfigurated){  
                        if ($(this)[0].typefield === "discount") {
                            let numeroDeDescuento = $(this)[0].numberInput;
                            let paymentMethod = $(this)[0].paymentMethodInput;
                            let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                            precioConDescuento = formatterAR.format(precioConDescuento);
                            const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
                    
                            $("#single-product a#btn-installments").before(leyenda);
                        }
                    }
                
                    if (installmentsIsConfigurated){  
                        if ($(this)[0].typefield === "installments") {
                            let numeroDeCuota = $(this)[0].numberInput;
                            let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                            valorDeCuota = formatterAR.format(valorDeCuota);
                    
                            const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
                    
                            $("#single-product a#btn-installments").before(leyenda);
                        }
                    }
                
                });
            }
        }
        
        }
        
        function leyendaEnCarrito(){
        
        let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
        price = parseFloat(price).toFixed(2);
        let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
        $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
        
        if (opcionesElegidasParsed.cart.length > 0) {
            $(opcionesElegidasParsed.detailMain).each(function(){
        
            if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            });
        }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

const Trend = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                  $(this).remove();
                });

          
                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                

                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                  $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);

                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
          
          
                      let nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i]+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                      $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                  }
                
        
                });
          
          
              }
            }
          }
        
        function cambiarLeyendaEnItem(item){
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
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
            });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
        let precioHTML = $("#price_display").text().trim().length;
        
        if (precioHTML > 1){
            let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
        
        
            if (opcionesElegidasParsed.detailMain.length > 0) {

                const discountIsConfigurated = opcionesElegidasParsed.detailMain.some((element) => {
                    return element.typefield === "discount";
                });

                const installmentsIsConfigurated = opcionesElegidasParsed.detailMain.some((element) => {
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
            
                $(opcionesElegidasParsed.detailMain).each(function(){
            
                    if (discountIsConfigurated){  
                        if ($(this)[0].typefield === "discount") {
                            let numeroDeDescuento = $(this)[0].numberInput;
                            let paymentMethod = $(this)[0].paymentMethodInput;
                            let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                            precioConDescuento = formatterAR.format(precioConDescuento);
                            const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
                    
                            $("#single-product a#btn-installments").before(leyenda);
                        }
                    }
                
                    if (installmentsIsConfigurated){  
                        if ($(this)[0].typefield === "installments") {
                            let numeroDeCuota = $(this)[0].numberInput;
                            let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                            valorDeCuota = formatterAR.format(valorDeCuota);
                    
                            const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
                    
                            $("#single-product a#btn-installments").before(leyenda);
                        }
                    }
                
                });
            }
        }
        
        }
        
        function leyendaEnCarrito(){
        
        let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
        price = parseFloat(price).toFixed(2);
        let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
        $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
        
        if (opcionesElegidasParsed.cart.length > 0) {
            $(opcionesElegidasParsed.detailMain).each(function(){
        
            if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            });
        }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

const Atlantico = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                  $(this).remove();
                });
          
                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                
                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
          
          
                      let nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i]+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                      $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                  }
                
                
                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                  $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);      
          
                  console.log(paymentIdSelector);
                  console.log(cuotas);
                });
          
          
              }
            }
          }
        
        function cambiarLeyendaEnItem(item){
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
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
            });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
        let precioHTML = $("#price_display").text().trim().length;
        
        if (precioHTML > 1){
            let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
        
        
            if (opcionesElegidasParsed.detailMain.length > 0) {
            $("#single-product .js-product-payments-container > span").each(function(){
                $(this).remove();
            });
            
            $(opcionesElegidasParsed.detailMain).each(function(){
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
                if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
            });
            }
        }
        
        }
        
        function leyendaEnCarrito(){
        
        let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
        price = parseFloat(price).toFixed(2);
        let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
        $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
        
        if (opcionesElegidasParsed.cart.length > 0) {
            $(opcionesElegidasParsed.detailMain).each(function(){
        
            if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            });
        }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

const Silent = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        //SILENT
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("div.box-title:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box-container .installments-container").each(function() {
                  $(this).remove();
                });


                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<div class="flags-container"><span class="installments-card"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big lazyloaded" alt="amex"></span><span class="installments-card"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big lazyloaded" alt="ar_cabal"></span><span class="installments-card"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big lazyloaded" alt="ar_cencosud"></span></div>';
                
                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div class="installments-container"><h5 class="subtitle">En 1 pago <span class="weight-strong">sin interés </span>de<span class="js-modal-installment-price text-primary weight-strong" data-installment="1"> $'+newPriceParsed+'</span></h5><div class="legal-info p-bottom-half"><span class="m-right-quarter"><span>CFT: </span><span class="weight-strong">0,00%</span></span><span class="m-right-quarter"><span>Total: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span><span class="m-right-quarter"><span>En 1 pago: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span></div>'+imagenesDeTarjetas+'<div class="divider-dotted"></div></div>';
                  $(paymentIdSelector).find("div.box-title:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box-container .pull-left.full-width.border-box").eq(0).append(cajaDe1cuota);
            
                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);          
                        let nuevaCajaDeCuotas = '<div class="installments-container"><h5 class="subtitle">'+cuotas[i]+' cuotas <span class="weight-strong">sin interés </span>de<span class="js-modal-installment-price text-primary weight-strong" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</span></h5><div class="legal-info p-bottom-half"><span class="m-right-quarter"><span>CFT: </span><span class="weight-strong">0,00%</span></span><span class="m-right-quarter"><span>Total: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span><span class="m-right-quarter"><span>En 1 pago: </span><span class="js-installments-one-payment weight-strong">$'+newPriceParsed+'</span></span></div>'+imagenesDeTarjetas+'<div class="divider-dotted"></div></div>'
                        $(paymentIdSelector).find("div.box-title:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box-container .pull-left.full-width.border-box").eq(0).append(nuevaCajaDeCuotas);      
                  }
          
                  console.log(paymentIdSelector);
                  console.log(cuotas);
                });

              }
            }
        }
        
        function cambiarLeyendaEnItem(item){
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
                    let numeroDeCuota = $(this)[0].numberInput;
                    let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                    valorDeCuota = formatterAR.format(valorDeCuota);
                    const cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts"><div class="js-max-installments item-installments js-max-installments-custom m-top-quarter "><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas sin interés de <strong class="js-installment-price installment-price">'+ valorDeCuota +'</strong></div></div>';

                    item.find(".item-price-container").append(cuotaCustomItem);
                    }
            
                    if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].numberInput;
                    let paymentMethod = $(this)[0].paymentMethodInput;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const cuotaCustomItem = '<div class="js-max-installments-container cuotas-custom-ts"><div class="js-max-installments item-installments js-max-installments-custom m-top-quarter "><strong class="js-installment-amount installment-amount">'+ numeroDeDescuento +'%</strong> de descuento con <strong class="js-installment-price installment-price">'+ paymentMethod +'</strong></div></div>';

                    item.find(".item-price-container").append(cuotaCustomItem);
                    }
            
                });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
            let precioHTML = $("#price_display").text().trim().length;
        
            if (precioHTML > 1){
                let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
                price = parseFloat(price).toFixed(2);
            
            
                if (opcionesElegidasParsed.detailMain.length > 0) {

                    const discountIsConfigurated = opcionesElegidasParsed.detailMain.some((element) => {
                        return element.typefield === "discount";
                    });

                    const installmentsIsConfigurated = opcionesElegidasParsed.detailMain.some((element) => {
                        return element.typefield === "installments";
                    });
                    
                    //Remove actual discounts
                    if (discountIsConfigurated){                    
                        $("#single-product .js-product-payments-container > .span12.m-left-none.m-bottom-half").each(function(){
                            $(this).remove();
                        });
                    }
                
                    //Remove actual installments
                    if (installmentsIsConfigurated){                    
                        $("#single-product .js-product-payments-container .m-bottom-half .js-max-installments-container.installments").each(function(){
                            $(this).remove();
                        });
                    }


                    $(opcionesElegidasParsed.detailMain).each(function(){
                
                        if (discountIsConfigurated){
                            if ($(this)[0].typefield === "discount") {
                                let numeroDeDescuento = $(this)[0].numberInput;
                                let paymentMethod = $(this)[0].paymentMethodInput;
                                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                                precioConDescuento = formatterAR.format(precioConDescuento);
                                const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
                        
                                $("#single-product .js-product-payments-container .m-bottom-half").append(leyenda);
                            }
                        }

                        if (installmentsIsConfigurated){
                            if ($(this)[0].typefield === "installments") {
                                let numeroDeCuota = $(this)[0].numberInput;
                                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                                valorDeCuota = formatterAR.format(valorDeCuota);
                                let paymentMethod = $(this)[0].paymentMethodInput;
                        
                                const leyenda = '<div class="js-max-installments-container cuotas-custom-ts installments m-bottom-quarter"><div class="js-max-installments product-installments"><strong class="js-installment-amount installment-amount">'+ numeroDeCuota +'</strong> cuotas de <strong class="js-installment-price installment-price">$'+ valorDeCuota +'</strong> con '+ paymentMethod +'</div></div>';
                                $("#single-product .js-product-payments-container .m-bottom-half:not(.span12)").append(leyenda);
                            }
                        }
                
                    });
                }
            }
        
        }
        
        function leyendaEnCarrito(){
        
            let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
            let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
            $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
            
            if (opcionesElegidasParsed.cart.length > 0) {
                $(opcionesElegidasParsed.detailMain).each(function(){
            
                if ($(this)[0].typefield === "discount") {
                    let numeroDeDescuento = $(this)[0].numberInput;
                    let paymentMethod = $(this)[0].paymentMethodInput;
                    let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                    precioConDescuento = formatterAR.format(precioConDescuento);
                    const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
            
                    $("#custom-cart-text").append(leyenda);
                }
            
                if ($(this)[0].typefield === "installments") {
                    let numeroDeCuota = $(this)[0].numberInput;
                    let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                    valorDeCuota = formatterAR.format(valorDeCuota);
            
                    const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
            
                    $("#custom-cart-text").append(leyenda);
                }
            
                });
            }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#ajax-cart-details span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

const Lifestyle = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                  $(this).remove();
                });
          
                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                
                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
          
          
                      let nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i]+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                      $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                  }
                
                
                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                  $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);      
          
                  console.log(paymentIdSelector);
                  console.log(cuotas);
                });
          
          
              }
            }
          }
        
        function cambiarLeyendaEnItem(item){
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
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
            });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
        let precioHTML = $("#price_display").text().trim().length;
        
        if (precioHTML > 1){
            let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
        
        
            if (opcionesElegidasParsed.detailMain.length > 0) {
            $("#single-product .js-product-payments-container > span").each(function(){
                $(this).remove();
            });
            
            $(opcionesElegidasParsed.detailMain).each(function(){
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
                if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
            });
            }
        }
        
        }
        
        function leyendaEnCarrito(){
        
        let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
        price = parseFloat(price).toFixed(2);
        let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
        $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
        
        if (opcionesElegidasParsed.cart.length > 0) {
            $(opcionesElegidasParsed.detailMain).each(function(){
        
            if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            });
        }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

const Material = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                  $(this).remove();
                });
          
                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                
                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
          
          
                      let nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i]+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                      $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                  }
                
                
                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                  $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);      
          
                  console.log(paymentIdSelector);
                  console.log(cuotas);
                });
          
          
              }
            }
          }
        
        function cambiarLeyendaEnItem(item){
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
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
            });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
        let precioHTML = $("#price_display").text().trim().length;
        
        if (precioHTML > 1){
            let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
        
        
            if (opcionesElegidasParsed.detailMain.length > 0) {
            $("#single-product .js-product-payments-container > span").each(function(){
                $(this).remove();
            });
            
            $(opcionesElegidasParsed.detailMain).each(function(){
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
                if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
            });
            }
        }
        
        }
        
        function leyendaEnCarrito(){
        
        let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
        price = parseFloat(price).toFixed(2);
        let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
        $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
        
        if (opcionesElegidasParsed.cart.length > 0) {
            $(opcionesElegidasParsed.detailMain).each(function(){
        
            if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            });
        }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

const Rio = () => {
    const { totalSelection } = useContext(OptionsContextObject);


    return(
        `<script>
        const opcionesElegidasJSON = '${JSON.stringify(totalSelection)}';
        let opcionesElegidasParsed = JSON.parse(opcionesElegidasJSON);
        
        const formatterAR = new Intl.NumberFormat('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        });
        
        function detalleDeProductoModal(){
        
            let paymentsInModal = opcionesElegidasParsed.totalSelectionModal;
          
            for (const paymentName in paymentsInModal) {
              if (paymentsInModal[paymentName].length > 1){
          
                let paymentIdSelector = "";
                let cuotas = [];
          
                paymentsInModal[paymentName].forEach((box) => {  
                    cuotas.push(box.numberInstallment);
                  paymentIdSelector = box.idSelector;
                });
          
                $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3 > div").each(function() {
                  $(this).remove();
                });
          
                $("#price_display").each(function() {
                  let price = $(this).text().replace(/[$.]+/g,"");
                  let newPrice = parseFloat(price).toFixed(2);
                  let newPriceParsed = new Intl.NumberFormat('es-AR').format(newPrice);
                  let imagenesDeTarjetas = '<span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/visa@2x.png" class="card-img card-img-big lazyloaded" alt="visa"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/amex@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="amex"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cabal@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cabal"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/mastercard@2x.png" class="card-img card-img-big lazyloaded" alt="mastercard"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/tarjeta-naranja@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_tarjeta-naranja"></span><span class="installments-card js-installments-flag-tab js-installments-cash-tab"><img src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" data-src="//d26lpennugtm8s.cloudfront.net/assets/common/img/logos/payment/new_logos_payment/ar/cencosud@2x.png" class="card-img card-img-big ls-is-cached lazyloaded" alt="ar_cencosud"></span>';
                
                  for (i = 0; i < cuotas.length; i++) {
                    let valorDeCuota = (newPrice/cuotas[i]).toFixed(2);
                    valorDeCuota = new Intl.NumberFormat('es-AR').format(valorDeCuota);
          
          
                      let nuevaCajaDeCuotas = '<div><h4 class="font-weight-normal mb-1">'+cuotas[i]+' cuotas <span>sin interés</span> de <strong class="js-modal-installment-price" data-installment="'+cuotas[i]+'"> $'+valorDeCuota+'</strong></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span><span><span>En 1 pago: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                      $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(nuevaCajaDeCuotas);      
                  }
                
                
                  //CAJA DE 1 CUOTA
                  let cajaDe1cuota = '<div><h4 class="font-weight-normal mb-1">En 1 pago <span>sin interés</span></h4><h6 class="font-weight-normal mb-2"><span class="mr-1"><span>CFT: </span><strong>0,00%</strong></span><span class="mr-1"><span>Total: </span><strong class="js-installments-one-payment">$'+newPriceParsed+'</strong></span></h6>'+imagenesDeTarjetas+'<div class="divider"></div></div>';
                
                  $(paymentIdSelector).find("h6.mb-2:contains(Tarjetas de crédito)").closest(paymentIdSelector).find(".box.p-3").eq(0).append(cajaDe1cuota);      
          
                  console.log(paymentIdSelector);
                  console.log(cuotas);
                });
          
          
              }
            }
          }
        
        function cambiarLeyendaEnItem(item){
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
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-installment-price installment-price font-weight-bold">'+ valorDeCuota +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const cuotaCustomItem = '<div><span class="js-max-installments-container cuotas-custom-ts js-max-installments item-installments"><span class="js-max-installments-custom"><span class="js-installment-amount installment-amount font-weight-bold">'+ numeroDeDescuento +'%</span> de descuento con <span class="js-installment-price installment-price font-weight-bold">'+ paymentMethod +'</span></span></span></div>';
        
                item.find(".item-description").append(cuotaCustomItem);
                }
        
            });
            }
        
        }
        
        
        function cambiarLeyendaPrincipalEnDetalle(){
        
        let precioHTML = $("#price_display").text().trim().length;
        
        if (precioHTML > 1){
            let price = document.querySelector("#price_display").innerText.replace(/[$.]+/g,"");
            price = parseFloat(price).toFixed(2);
        
        
            if (opcionesElegidasParsed.detailMain.length > 0) {
            $("#single-product .js-product-payments-container > span").each(function(){
                $(this).remove();
            });
            
            $(opcionesElegidasParsed.detailMain).each(function(){
        
                if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<span class="col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 144c-53 0-96 50.1-96 112 0 61.8 43 112 96 112s96-50.1 96-112-43-112-96-112zm0 192c-35.3 0-64-35.9-64-80s28.7-80 64-80 64 35.9 64 80-28.7 80-64 80zM608 64H32A32 32 0 000 96v320a32 32 0 0032 32h576a32 32 0 0032-32V96a32 32 0 00-32-32zM32 96h64a64 64 0 01-64 64V96zm0 320v-64a64 64 0 0164 64H32zm576 0h-64a64 64 0 0164-64v64zm0-96c-52.9 0-96 43.1-96 96H128c0-52.9-43.1-96-96-96V192c52.9 0 96-43.1 96-96h384c0 52.9 43.1 96 96 96v128zm0-160a64 64 0 01-64-64h64v64z"></path></svg></span><span><strong class="text-accent">'+ numeroDeDescuento +'% de descuento</strong> con '+ paymentMethod +'</span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
                if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<span class="js-max-installments-container cuotas-custom-ts js-max-installments col-12 mb-2"><span class="float-left mr-2"><svg class="icon-inline svg-icon-accent icon-lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M498.5,470.3H77.5C34.7,470.3,0,435.6,0,392.9V119.1c0-42.7,34.7-77.5,77.5-77.5h421.1c42.7,0,77.5,34.7,77.5,77.5v273.7 C576,435.6,541.3,470.3,498.5,470.3z M77.5,70.3c-27,0-48.9,21.9-48.9,48.9v273.7c0,27,21.9,48.9,48.9,48.9h421.1 c27,0,48.9-21.9,48.9-48.9V119.1c0-27-21.9-48.9-48.9-48.9H77.5z M218.1,371.8c0-7.9-6.4-14.3-14.3-14.3H98.5 c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C211.7,386.1,218.1,379.7,218.1,371.8z M365.5,371.8c0-7.9-6.4-14.3-14.3-14.3 H245.9c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C359.1,386.1,365.5,379.7,365.5,371.8z M512.8,371.8 c0-7.9-6.4-14.3-14.3-14.3H393.3c-7.9,0-14.3,6.4-14.3,14.3s6.4,14.3,14.3,14.3h105.3C506.4,386.1,512.8,379.7,512.8,371.8z M512.8,140.2c0-7.9-6.4-14.3-14.3-14.3h-42.1c-7.9,0-14.3,6.4-14.3,14.3c0,7.9,6.4,14.3,14.3,14.3h42.1 C506.4,154.5,512.8,148.1,512.8,140.2z M203.8,259.8H98.5c-7.9,0-14.3-6.4-14.3-14.3V140.2c0-7.9,6.4-14.3,14.3-14.3h105.3 c7.9,0,14.3,6.4,14.3,14.3v105.3C218.1,253.4,211.7,259.8,203.8,259.8z M112.8,231.2h76.7v-76.7h-76.7V231.2z"></path></svg></span><span class="d-table"><span class="js-max-installments"><span class="text-accent font-weight-bold"><span class="js-installment-amount installment-amount">'+ numeroDeCuota +'</span> cuotas sin interés</span> de <span class="js-installment-price installment-price">$'+ valorDeCuota +'</span></span></span></span>';
        
                $("#single-product a#btn-installments").before(leyenda);
                }
        
            });
            }
        }
        
        }
        
        function leyendaEnCarrito(){
        
        let price = $("span.js-cart-total").text().replace(/[$.]+/g,"");
        price = parseFloat(price).toFixed(2);
        let leyendaCarrito = '<div id="custom-cart-text" class="js-installments-cart-total text-right"></div>';
        $("#modal-cart .js-installments-cart-total").replaceWith(leyendaCarrito);
        
        if (opcionesElegidasParsed.cart.length > 0) {
            $(opcionesElegidasParsed.detailMain).each(function(){
        
            if ($(this)[0].typefield === "discount") {
                let numeroDeDescuento = $(this)[0].numberInput;
                let paymentMethod = $(this)[0].paymentMethodInput;
                let precioConDescuento = (price - numeroDeDescuento).toFixed(2);
                precioConDescuento = formatterAR.format(precioConDescuento);
                const leyenda = '<div data-interest="0" data-cart-discount="'+ numeroDeDescuento +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">'+ numeroDeDescuento +'% de descuento con <span class="js-cart-installments-amount">'+ paymentMethod +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            if ($(this)[0].typefield === "installments") {
                let numeroDeCuota = $(this)[0].numberInput;
                let valorDeCuota = (price/numeroDeCuota).toFixed(2);
                valorDeCuota = formatterAR.format(valorDeCuota);
        
                const leyenda = '<div data-interest="0" data-cart-installment="'+ numeroDeCuota +'" class="js-installments-cart-total cuota-carrito-custom text-right text-accent font-weight-bold">O hasta <span class="js-cart-installments-amount">'+ numeroDeCuota +'</span> cuotas sin interés de <span class="js-cart-installments installment-price">$'+ valorDeCuota +'</span></div>';
        
                $("#custom-cart-text").append(leyenda);
            }
        
            });
        }
        
        }
        
        
        $(document).ready(function(){
        
        if (LS.product) {
            setTimeout(function (){
            cambiarLeyendaPrincipalEnDetalle();
            detalleDeProductoModal();
            LS.registerOnChangeVariant(cambiarLeyendaPrincipalEnDetalle);
            LS.registerOnChangeVariant(detalleDeProductoModal);
            })
        }
        
        setTimeout(function (){
        
            $(".js-item-product").each(function() {
            if (!$(this).find(".custom-cuotas-ts").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            }
            });
        
            $(window).scroll(function(){
            $(".js-item-product").each(function() {
                if (!$(this).find(".custom-cuotas-item").length){
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
                }
            });
            });
        
            LS.registerOnChangeVariant(function(){
            $(".js-item-product").each(function() {
                let currentItem = $(this);
                cambiarLeyendaEnItem(currentItem);
            });
            });
        
            leyendaEnCarrito();
        
            const observer = new MutationObserver((mutation) => {
            if (mutation) {
                setTimeout(() => {
                leyendaEnCarrito();
                });
            }
            });
        
            observer.observe(document.querySelector("#modal-cart span.js-cart-total"), {
            subtree: true,
            childList: true,
            attributes: true,
            caracterData: true
            });
        });
        });
        $("a.js-load-more").click(function(){
        setTimeout(function() {
            $(".js-item-product").each(function() {
            let currentItem = $(this);
            cambiarLeyendaEnItem(currentItem);
            });
        }, 2000);
        });
        </script>`
    )
};

export { AmazonasSolid, AmazonasLight, Simple, Idea, Trend, Atlantico, Silent, Lifestyle, Material, Rio };