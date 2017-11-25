angular
    .module('app')
    .component('topupCom', {
        templateUrl: 'app/topup/template/topup.html',
        controller: function ($scope, $http, $filter, $window) {
            // $scope.cardNumber = '5755757';
            $scope.baseUrl = 'http://localhost:9000/';

            $scope.processIndicator = false;
            $scope.cardSwap = true;
            $scope.topup = false;
            var id;
            var cardStatus;
            var availableBalnce;
            $scope.enterdAmount = 0;
            $scope.totalmoney = 0;
            $scope.showRload = true;
            $scope.reload = false;
            $scope.cashPay = false;
            $scope.cashPayConf = false;
            $scope.cardPay = false;
            $scope.value = 0;
            $scope.loadedPassenger;
            $scope.loadedCard;
            var specialAccess = false;
            $scope.NObuttonStatus = true;
            $scope.correctCard = false;


            //press enter key
            var wage = document.getElementById("cardNumber");
            wage.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                    validate(e);
                    $scope.loadData();
                }
            });

            function validate(e) {
                var text = e.target.value;

                if ($scope.correctCard) {
                    $scope.processIndicator = true;
                    $scope.getData();
                }
            }
            $scope.getData = function () {

                var elem = document.getElementById("myBar");
                var width = 0;
                var id = setInterval(frame, 70);
                function frame() {
                    if (width == 100) {
                        clearInterval(id);
                        $scope.$apply(function () {
                            $scope.cardSwap = false;
                            $scope.topup = true;
                        });



                    } else {
                        width++;
                        elem.style.width = width + '%';
                    }
                }


            }
            //change beetween pages

            //load card data
            $scope.loadData = function () {
                $http.get($scope.baseUrl + 'cards/').then(function (cardsResult) {
                    //load passenger data
                    $http.get($scope.baseUrl + 'passengers/').then(function (passengerResult) {
                        console.log(passengerResult.data.content);
                        console.log(cardsResult.data.content);
                        var passeger;
                        var card;
                        for (passeger in passengerResult.data.content) {
                            if (passengerResult.data.content[passeger].card_number == $scope.cardNumber) {
                                $scope.loadedPassenger = passengerResult.data.content[passeger];
                                break;
                            }
                        }
                        for (card in cardsResult.data.content) {
                            if (cardsResult.data.content[card].card_number == $scope.cardNumber) {
                                $scope.correctCard = true;
                                $scope.loadedCard = cardsResult.data.content[card];
                                $scope.loadedCard.expiry_date = $filter('date')($scope.loadedCard.expiry_date, "yyyy/MM/dd");
                                id = $scope.loadedCard._id;
                                cardStatus = $scope.loadedCard.status;
                                availableBalnce = $scope.loadedCard.balance;
                                break;
                            }
                        }
                        console.log("Current Passenger Is:");
                        console.log($scope.loadedPassenger);
                        console.log("Current card Is:");
                        console.log($scope.loadedCard);
                    });
                });
            }




            $scope.changeButtonStatus = function () {
                $scope.showRload = false;
                $scope.reload = true;
            }

            $scope.backtoHome = function () {

                if (specialAccess) {
                    $scope.showRload = true;
                    $scope.reload = false;
                    $scope.cashPay = false;
                    $scope.cashPayConf = false;
                    $scope.cardPay = false;
                }

                else if ($scope.reload || $scope.cashPay || $scope.cashPayConf || $scope.cardPay) {
                    swal({
                        title: "Transaction in process",
                        text: "Do you need to terminate the transaction.",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function () {
                        setTimeout(function () {
                            swal("Transaction Terminated");
                            $scope.$apply(function () {
                                $scope.showRload = true;
                                $scope.reload = false;
                                $scope.cashPay = false;
                                $scope.cashPayConf = false;
                                $scope.cardPay = false;
                            });

                        }, 1500);
                    });
                    // var back = confirm("Do you want to cancel transaction");
                    // if (back) {

                    //     $scope.showRload = true;
                    //     $scope.reload = false;
                    //     $scope.cashPay = false;
                    //     $scope.cashPayConf = false;
                    //     $scope.cardPay = false;

                    // }
                }
            }


            $scope.docashPayment = function () {

                $scope.reload = false;
                $scope.cashPay = true;

            }

            $scope.docardPayment = function () {
                $scope.reload = false;
                $scope.cardPay = true;
            }

            $scope.pay = function () {
                if ($scope.enterdAmount > 0) {
                    $scope.totalmoney = $scope.totalmoney + $scope.enterdAmount;
                    $scope.cardPay = false;
                    $scope.cashPay = false;
                    $scope.cashPayConf = true;
                    $scope.enterdAmount = 0;
                }
                else {
                    swal({
                        type: 'error',
                        title: "Invalid Amount",
                        text: "Please enter correct amount to reolad.",
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            }

            $scope.Cardpay_method = function () {

                if ($scope.enterdAmount > 0 && $scope.cardNumber > 0 && $scope.ccv_cvc > 0) {
                    $scope.totalmoney = $scope.totalmoney + $scope.enterdAmount;
                    $scope.cardPay = false;
                    $scope.cashPay = false;
                    $scope.cashPayConf = true;
                    $scope.enterdAmount = 0;
                    $scope.NObuttonStatus = false;

                }
                else {
                    swal({
                        type: 'error',
                        title: "Plase fill correct values",
                        text: "Make sure you enter all the inputs correctly.",
                        timer: 3000,
                        showConfirmButton: false
                    });
                }
            }

            $scope.transactionCompleate = function () {

                var toatalAmount = availableBalnce + $scope.totalmoney;
                var reload = $scope.totalmoney;
                var modified = {

                    "status": "active",
                    "balance": toatalAmount
                }


                $http.put($scope.baseUrl + 'cards/' + id + '/', modified).then(function (result) {
                    var text = 'Current Account Balance Is ' + toatalAmount + '.00 LKR';
                    // swal({
                    //     type: 'success',
                    //     title: "Transcation Compleate",
                    //     text: text,
                    //     timer: 3000,
                    //     showConfirmButton: false
                    // });



                    swal({
                        title: "Transaction in process",
                        text: "Do you need continue",
                        type: "info",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function () {
                        setTimeout(function () {
                            swal("Transaction Compleated!", text, "success");
                            $scope.$apply(function () {
                                $scope.loadedCard.balance = toatalAmount;
                                specialAccess = true;
                                $scope.NObuttonStatus = true;
                                $scope.backtoHome();
                            });

                        }, 3000);
                    });


                });


            }

            $scope.callBackTomoneyLoad = function () {
                $scope.cashPayConf = false;
                $scope.cashPay = true;
            }

            $scope.endtranscation = function () {
                // var End = confirm("Do you need to end the transaction");
                // if (End) {
                //     // swal({
                //     //     type: 'success',
                //     //     title: "Have a nice day",
                //     //     text: "Make sure you get your card back",
                //     //     timer: 3000,
                //     //     showConfirmButton: false
                //     // });
                //     $window.location.href = 'file:///C:/Users/Kasun/Documents/CSSE2/CSSE-2/TopUpApp/Poject_Implimentation/cardInput_Page.html';
                // }
                swal({
                    title: "Do you need to end the transaction",
                    text: "",
                    type: "info",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true
                }, function () {
                    setTimeout(function () {
                        swal("Have a nice day.", "Bring your card back");
                        $scope.$apply(function () {

                            $scope.cardSwap = true;
                            $scope.topup = false;
                            $scope.processIndicator = false;
                            document.getElementById("myBar").style.width = 0 + '%';

                        });

                    }, 3000);
                });

            }

        }
    });
