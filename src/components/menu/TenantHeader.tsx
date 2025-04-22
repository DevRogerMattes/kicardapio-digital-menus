
import React from "react";
import { Tenant } from "@/types/models";

interface TenantHeaderProps {
  tenant: Tenant;
}

const TenantHeader: React.FC<TenantHeaderProps> = ({ tenant }) => {
  return (
    <div className="pt-6 pb-8">
      <div className="flex items-center gap-4 mb-4">
        {tenant.logo && (
          <img
            src={tenant.logo}
            alt={`${tenant.name} logo`}
            className="w-16 h-16 object-contain rounded-full border border-muted"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{tenant.name}</h1>
          {tenant.address && (
            <p className="text-muted-foreground text-sm">{tenant.address}</p>
          )}
        </div>
      </div>
      {tenant.description && (
        <p className="text-muted-foreground">{tenant.description}</p>
      )}
    </div>
  );
};

export default TenantHeader;
