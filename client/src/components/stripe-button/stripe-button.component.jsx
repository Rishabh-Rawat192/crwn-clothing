import StripCheckout from "react-stripe-checkout";
import axios from "axios";

const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51Guz3NGFH5AGiIil6aY1tHrtIj05aYvTNxFNkiMwI3bSBt7tjxZGIaHKEtPrK4eKkW7jdQ3C7Xl35W9mvpJ6eIAG006LJHzQMB";

    const onToken = (token) => {
        console.log(token);
        axios({
            url: "payment",
            method: "POST",
            data: {
                amount: priceForStripe,
                token,
            },
        })
            .then((response) => alert("Payment successful!"))
            .catch((error) => {
                console.log("Payment Error: ", error);
                alert(
                    "There was an issue with your payment. Please use the provided credit card"
                );
            });
    };

    return (
        <StripCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            currency="INR"
            description={`Your total is ₹${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripCheckoutButton;
