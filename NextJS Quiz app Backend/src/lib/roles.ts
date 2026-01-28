import {Role as PrismaRole} from '@/generated/prisma/enums'

// Enum met Hierarchy om rechten in te stellen. bv de route join als je dit enkel voor een user toegankelijk maakt dan kan admin hier niet aan. Maar nu zeg je dat alles was een user kan
export enum RoleHierarchy {
  User = 1,
  Admin = 2
}

// Helper functie om de prisma role om te zetten naar de Hierarchy role
export const getRoleHierarchy = (role: PrismaRole): RoleHierarchy => {
  switch (role){
    case PrismaRole.User:
      return RoleHierarchy.User
    case PrismaRole.Admin:
      return RoleHierarchy.Admin
    default:
      return RoleHierarchy.User
  }
}