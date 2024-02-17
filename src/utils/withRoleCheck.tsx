import { useUser } from "@auth0/nextjs-auth0/client";
import { useAppSelector } from "@lib/hook";
import React from "react";

export function withRoleCheck(WrappedComponent: React.ComponentType<any>) {
  const WithRoleCheck = (props: any) => {
    const { isLoading } = useUser();
    const qrCount = useAppSelector((state) => state.app.qrCount);
    const userRole = useAppSelector((state) => state.app.userRole);

    // If the user data is still loading, return a loading state
    if (isLoading) {
      return <div>Loading...</div>;
    }

    // If the user's role is not 'premium' and they have 2 or more QR codes,
    // render the wrapped component with a 'disabled' prop
    if (userRole !== "Pro" && qrCount >= 2) {
      return <WrappedComponent {...props} disabled={true} />;
    }

    // Otherwise, render the wrapped component normally
    return <WrappedComponent {...props} />;
  };

  WithRoleCheck.displayName = `WithRoleCheck(${getDisplayName(
    WrappedComponent
  )})`;

  return WithRoleCheck;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
