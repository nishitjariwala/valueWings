import React from "react";
import Collapsible from "react-collapsible";
import "./faqs.scss";
import { AiOutlineDown } from "react-icons/ai";

const Faqs = () => {
  const symbol = <AiOutlineDown />;
  return (
    <div className="container p-5 mb-5">
      <div id="carSearch" className="col-lg-12 title mt-0">
        FAQs
      </div>

      <Collapsible
        trigger="How is ValueWings Different from other pricing engines in the world?"
        open={true}
        style={{ width: "100%" }}
        triggerTagName={"div"}
        easing={"cubic-bezier(0.175, 0.885, 0.32, 2.275)"}
      >
        <span className="dot"></span>

        <p className="">
          ValueWings takes an entirely algorithmic approach to determine the
          fair price range of any used automobile rather than determining the
          prices based on past transactions. Also, ValueWings is the only
          pricing engine that determines the fair price range of any used
          automobile and also unbised way.
        </p>
      </Collapsible>

      <Collapsible
        trigger="
Why ValueWings is necessary?"
triggerTagName={"div"}
        easing={"cubic-bezier(0.175, 0.885, 0.32, 2.275)"}
      >
        <p className="blockquote">
          Estimating the fair price for any used automobile is not an easy task
          and often the buyer feels that he/ she has paid more than the actual
          worth of the vehicle and the seller feels that he/ she has sold the
          vehicle at a loss. So ValueWings is definitely necessary to make sure
          both the buyer and seller leave the table happy at the end of a
          transaction.
        </p>
      </Collapsible>
      <Collapsible
      triggerTagName={"div"}
        trigger="How ValueWings benefits the seller?"
        easing={"cubic-bezier(0.175, 0.885, 0.32, 2.275)"}
      >
        <p className="blockquote">
          When a buyer is interested in a listing created by a seller, he/ she
          will get a pricing from ValueWings. This will give trust to the buyer
          and the buyer will not negotiate with the seller while pursuing the
          transaction. Also, the seller will have a better throughput with the
          listings.
        </p>
      </Collapsible>
      <Collapsible
      triggerTagName={"div"}
        trigger="What do I do after knowing the ValueWings of my vehicle?"
        easing={"cubic-bezier(0.175, 0.885, 0.32, 2.275)"}
      >
        <p className="blockquote">
          Knowing the Orange book value for a vehicle can help both during
          buying as well as selling process. Knowing the fair price range helps
          a user to take further decision.
        </p>
      </Collapsible>
    </div>
  );
};

export default Faqs;
