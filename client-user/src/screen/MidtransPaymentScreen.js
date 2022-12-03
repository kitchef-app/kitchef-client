import { View, Image, StatusBar } from "react-native";
import { COLORS } from "../constants/theme";
import { WebView } from "react-native-webview";
import { useMutation } from "@apollo/client";
import { PUT_CHANGE_STATUS_INVOICE } from "../queries/payment";

export default function MidtransPaymentScreen({ navigation, route }) {
  const {
    token,
    redirect_url,
    total,
    subTotal,
    shippingCost,
    cart,
    UserId,
    DriverId,
    invoiceId,
  } = route.params;
  // console.log(route.params, "Dari midtrans payment screen");

  console.log(invoiceId, "Invoice id dari midtranspayment screen");
  const [changeStatusInvoice, { loading, error, data }] = useMutation(
    PUT_CHANGE_STATUS_INVOICE
  );

  const uri = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="SB-Mid-client-wBu3UxzodVCPQXcQ"></script>
  </head>

  <body>
    <div id="pay-button"></div>

    <script type="text/javascript">
   

    const object = {
      midtrans:  function () {
        window.snap.pay('${token}', {
          onSuccess: function(result){
            window.ReactNativeWebView.postMessage("Paid");
          },
          onPending: function(result){
            window.ReactNativeWebView.postMessage("Pending");
          },
          onError: function(result){
            window.ReactNativeWebView.postMessage("Failure");
          },
          onClose: function(){
            window.ReactNativeWebView.postMessage("Closed");
          }
        })
      };
    }

    document.getElementById('pay-button').innerHTML = object.midtrans()
  </script>
  </body>
</html>
  `;
  return (
    <WebView
      source={{ html: uri }}
      injectedJavaScript={`window.snap.pay('${token}', {
        onSuccess: function(result){
          window.ReactNativeWebView.postMessage("Paid");
        },
        onPending: function(result){
          window.ReactNativeWebView.postMessage("Pending");
        },
        onError: function(result){
          window.ReactNativeWebView.postMessage("Failure");
        },
        onClose: function(){
          window.ReactNativeWebView.postMessage("Closed");
        }
      })`}
      onMessage={(event) => {
        if (event.nativeEvent.data == "Paid") {
          changeStatusInvoice({
            variables: {
              invoiceId,
            },
          })
            .then((res) => {
              navigation.navigate("HomeNavigator");
            })
            .catch((err) =>
              console.log(err, "ini err dari change status invoice")
            );
        } else {
          navigation.replace("CartScreen");
        }
      }}
    />
  );
}