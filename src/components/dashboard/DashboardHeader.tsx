
import React from "react";
import { Tenant } from "@/types/models";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  tenant: Tenant;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ tenant }) => {
  const getPlanBadgeColor = (planType: string) => {
    switch (planType) {
      case "free":
        return "bg-gray-500";
      case "pro":
        return "bg-blue-500";
      case "premium":
        return "bg-kicardapio-orange";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{tenant.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge className={getPlanBadgeColor(tenant.planType)}>
              Plano {tenant.planType.charAt(0).toUpperCase() + tenant.planType.slice(1)}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {tenant.slug}.kicardapio.com
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`/demo/${tenant.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <span>Ver cardápio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
