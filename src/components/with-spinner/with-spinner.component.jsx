import React from "react";

import { SpinnerOverlay, SpinnerContainer } from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => ({ isLoaded, ...otherProps }) => {
        return isLoaded ? (
          <WrappedComponent {...otherProps} />
        ) : (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        );
}

export default WithSpinner;