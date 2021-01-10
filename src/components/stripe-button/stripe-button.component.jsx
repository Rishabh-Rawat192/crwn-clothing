import StripCheckout from "react-stripe-checkout";

const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey =
        "pk_test_51Guz3NGFH5AGiIil6aY1tHrtIj05aYvTNxFNkiMwI3bSBt7tjxZGIaHKEtPrK4eKkW7jdQ3C7Xl35W9mvpJ6eIAG006LJHzQMB";

    const onToken = (token) => {
        console.log(token);
        alert("Payment successful!");
    };

    return (
        <StripCheckout
            label="Pay Now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            currency="USD"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripCheckoutButton;
