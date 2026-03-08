"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import apiClient from "@/lib/apiClient";

export interface CurrencyRate {
  code: string;
  rate: number;
  symbol: string;
  name: string;
  locale: string;
}

interface CurrencyApiResponse {
  base: string;
  currencies: CurrencyRate[];
  lastUpdated: string;
}

interface CurrencyContextValue {
  /** All supported currencies with their current rates */
  rates: CurrencyRate[];
  /** true while the initial rates fetch is in-flight */
  ratesLoading: boolean;
  /** The ISO-4217 code the user has selected, e.g. "SAR" */
  userCurrency: string;
  /**
   * Update the active currency in context + localStorage.
   * Call this alongside PUT /api/Settings when the user saves settings.
   */
  setCurrency: (code: string) => void;
  /** Format a USD price into the user's chosen currency string */
  formatPrice: (usdAmount: number) => string;
  /** Look up a single rate entry by currency code */
  getRate: (code: string) => CurrencyRate | undefined;
}

// ── Fallback so the UI never crashes before the fetch resolves ─────────────
const FALLBACK_RATES: CurrencyRate[] = [
  { code: "USD", rate: 1,      symbol: "$",   name: "US Dollar",     locale: "en-US" },
  { code: "EUR", rate: 0.92,   symbol: "€",   name: "Euro",          locale: "de-DE" },
  { code: "GBP", rate: 0.79,   symbol: "£",   name: "British Pound", locale: "en-GB" },
  { code: "SAR", rate: 3.75,   symbol: "﷼",   name: "Saudi Riyal",   locale: "ar-SA" },
  { code: "AED", rate: 3.6725, symbol: "د.إ", name: "UAE Dirham",    locale: "ar-AE" },
];

const LS_KEY = "alina_currency";

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<CurrencyRate[]>(FALLBACK_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);

  // Hydrate from localStorage on the client to avoid flash
  const [userCurrency, setUserCurrencyState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(LS_KEY) ?? "USD";
    }
    return "USD";
  });

  // Fetch live rates once on mount — public endpoint, no auth required
  useEffect(() => {
    apiClient
      .get<CurrencyApiResponse>("/api/currency/rates")
      .then(({ data }) => {
        if (data?.currencies?.length) {
          setRates(data.currencies);
        }
      })
      .catch(() => {
        // keep fallback rates — no user-visible error needed here
      })
      .finally(() => setRatesLoading(false));
  }, []);

  const setCurrency = useCallback((code: string) => {
    setUserCurrencyState(code);
    if (typeof window !== "undefined") {
      localStorage.setItem(LS_KEY, code);
    }
  }, []);

  const getRate = useCallback(
    (code: string) => rates.find((r) => r.code === code),
    [rates]
  );

  const formatPrice = useCallback(
    (usdAmount: number): string => {
      const curr = rates.find((r) => r.code === userCurrency) ?? FALLBACK_RATES[0];
      const converted = usdAmount * curr.rate;
      try {
        return new Intl.NumberFormat(curr.locale, {
          style: "currency",
          currency: curr.code,
          maximumFractionDigits: 2,
        }).format(converted);
      } catch {
        return `${curr.symbol}${converted.toFixed(2)}`;
      }
    },
    [rates, userCurrency]
  );

  return (
    <CurrencyContext.Provider
      value={{ rates, ratesLoading, userCurrency, setCurrency, formatPrice, getRate }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
