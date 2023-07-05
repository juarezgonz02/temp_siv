import EMiddleware from "./EventMiddleware";
import Pmiddelware from "./PaymentMiddleware";
import AMiddleware from "./AuthMiddleware";
import ACMiddleware from "./AccountMiddleware";
import ANMiddleware from "./AnalisysMiddleware";
import CMiddleware from "./CreationMiddleware";

export const PaymentMiddleware = Pmiddelware
export const EventMiddleware = EMiddleware
export const AuthMiddleware = AMiddleware
export const AccountMiddleware = ACMiddleware
export const AnalysisMiddleware = ANMiddleware
export const CreationMiddleware = CMiddleware