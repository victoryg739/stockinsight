"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { RxCross1 } from "react-icons/rx";
import MetricSection from "../MarketInsightTable";
import { useQuery } from "@tanstack/react-query";
import * as queryFn from "../../utils/queryAPIFunctions";
import { convRound2Dp, convToMillion } from "../../utils/helper";
import { CiSearch } from "react-icons/ci";
import { IoReloadCircle } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

// ─── Types ────────────────────────────────────────────────────────────────────

type IndustryAverages = {
  revenue_growth_rate_5y: number | null;
  pretax_operating_margin: number | null;
  pretax_operating_margin_adj: number | null;
  sales_to_capital: number | null;
  cost_of_capital: number | null;
  market_debt_to_capital: number | null;
  aftertax_roc: number | null;
  reinvestment_rate: number | null;
};

type InputStats = {
  revenue_growth_rate_first_quartile: number | null;
  revenue_growth_rate_median: number | null;
  revenue_growth_rate_third_quartile: number | null;
  pre_tax_operating_margin_first_quartile: number | null;
  pre_tax_operating_margin_median: number | null;
  pre_tax_operating_margin_third_quartile: number | null;
  sales_to_invested_capital_first_quartile: number | null;
  sales_to_invested_capital_median: number | null;
  sales_to_invested_capital_third_quartile: number | null;
  cost_of_capital_first_quartile: number | null;
  cost_of_capital_median: number | null;
  cost_of_capital_third_quartile: number | null;
  debt_to_capital_ratio_first_quartile: number | null;
  debt_to_capital_ratio_median: number | null;
  debt_to_capital_ratio_third_quartile: number | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Multiply stored decimal fraction by 100 → percentage number, or null. */
const toPct = (v: number | null | undefined): number | null =>
  v != null ? parseFloat((v * 100).toFixed(4)) : null;

// ─── Spinner ─────────────────────────────────────────────────────────────────

const Spinner = ({ size = 10, color = "text-blue-500" }: { size?: number; color?: string }) => (
  <svg
    className={`animate-spin h-${size} w-${size} ${color}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

const MarketInsightPopoutPage = ({
  setIsPopoutOpen,
  industries,
  getPageInputValue,
  symbol,
}: any) => {
  const popoutRef = useRef<HTMLDivElement>(null);

  // ── Peer companies ──
  const [peerCompanies, setPeerCompanies] = useState<string[]>([]);
  const [loadingPeers, setLoadingPeers] = useState(false);

  // ── Comp analysis ──
  const compAnalysisRef = useRef([
    { ticker: symbol, shortName: "", revenue: 0, ebit: 0, ebitMargin: 0, peRatio: 0, roic: 0 },
    { ticker: "", shortName: "", revenue: 0, ebit: 0, ebitMargin: 0, peRatio: 0, roic: 0 },
  ]);
  const [inputTickers, setInputTickers] = useState<string[]>([symbol, ""]);
  const [averages, setAverages] = useState({ avgRoic: "N/A", avgPeRatio: "N/A", avgEbitMargin: "N/A" });
  const [isFetchingCompAnalysis, setIsFetchingCompAnalysis] = useState(false);
  const [, forceUpdate] = useState({});
  const triggerReRender = () => forceUpdate({});

  // ── Data queries ──
  const {
    data: inputStats,
    isLoading: inputStatsLoading,
    error: inputStatsError,
  } = useQuery<InputStats>({
    queryKey: ["inputStats", industries],
    queryFn: () => queryFn.fetchInputStats(industries),
    staleTime: 0,
    retry: 1,
  });

  const {
    data: industryUS,
    isLoading: industryUSLoading,
    error: industryUSError,
  } = useQuery<IndustryAverages | null>({
    queryKey: ["industryAveragesUS", industries],
    queryFn: () => queryFn.fetchIndustryAveragesUS(industries),
    staleTime: 0,
    retry: 1,
  });

  const {
    data: industryGlobal,
    isLoading: industryGlobalLoading,
    error: industryGlobalError,
  } = useQuery<IndustryAverages | null>({
    queryKey: ["industryAveragesGlobal", industries],
    queryFn: () => queryFn.fetchIndustryAveragesGlobal(industries),
    staleTime: 0,
    retry: 1,
  });

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(event.target as Node)) {
        setIsPopoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsPopoutOpen]);

  // Update inputTickers when symbol changes
  useEffect(() => {
    setInputTickers([symbol, ""]);
  }, [symbol]);

  // Fetch peers on mount
  const fetchPeers = useCallback(async () => {
    setLoadingPeers(true);
    try {
      const peers = await queryFn.fetchFinnhubPeers(symbol);
      setPeerCompanies(peers.filter((peer: string) => peer !== symbol).slice(0, 10));
    } catch {
      setPeerCompanies([]);
    } finally {
      setLoadingPeers(false);
    }
  }, [symbol]);

  useEffect(() => {
    if (symbol) fetchPeers();
  }, [symbol]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleCompAnalysis = useCallback(async () => {
    setIsFetchingCompAnalysis(true);
    try {
      inputTickers.forEach((ticker, index) => {
        if (compAnalysisRef.current[index]) compAnalysisRef.current[index].ticker = ticker;
      });

      const results = await Promise.all(
        inputTickers.map((ticker) =>
          ticker?.trim() ? queryFn.fetchCompAnalysis(ticker) : Promise.resolve(null)
        )
      );

      const avg = {
        ebitMargin: { value: 0, count: 0 },
        peRatio: { value: 0, count: 0 },
        roic: { value: 0, count: 0 },
      };

      results.forEach((result, index) => {
        if (result && compAnalysisRef.current[index]) {
          compAnalysisRef.current[index] = { ...compAnalysisRef.current[index], ...result };
          if (result.ticker !== "") {
            if (result.ebitMargin != null) {
              avg.ebitMargin.count++;
              avg.ebitMargin.value += (result.ebitMargin - avg.ebitMargin.value) / avg.ebitMargin.count;
            }
            if (result.peRatio != null && result.peRatio !== 0) {
              avg.peRatio.count++;
              avg.peRatio.value += (result.peRatio - avg.peRatio.value) / avg.peRatio.count;
            }
            if (result.roic != null && result.roic !== 0) {
              avg.roic.count++;
              avg.roic.value += (result.roic - avg.roic.value) / avg.roic.count;
            }
          }
        }
      });

      setAverages({
        avgEbitMargin: convRound2Dp(avg.ebitMargin.value),
        avgPeRatio: convRound2Dp(avg.peRatio.value),
        avgRoic: convRound2Dp(avg.roic.value),
      });
      triggerReRender();
    } catch (error) {
      console.error("Error fetching comp analysis:", error);
    } finally {
      setIsFetchingCompAnalysis(false);
    }
  }, [inputTickers]);

  // ── Derived values for page inputs ──
  const toNum = (v: unknown): number | null => {
    const n = typeof v === "number" ? v : parseFloat(v as string);
    return isNaN(n) ? null : n;
  };

  const revGrowthYr1 = toNum(getPageInputValue("revGrowthYr1", "inputs"));
  const revGrowthYr2to5 = toNum(getPageInputValue("revGrowthYr2to5", "inputs"));
  const opMarginYr1 = toNum(getPageInputValue("opMarginYr1", "inputs"));
  const opMarginYr10 = toNum(getPageInputValue("opMarginYr10", "inputs"));
  const salesToCapYr1 = toNum(getPageInputValue("salesToCapYr1", "inputs"));
  const salesToCapYr2to5 = toNum(getPageInputValue("salesToCapYr2to5", "inputs"));
  const salesToCapYr6to10 = toNum(getPageInputValue("salesToCapYr6to10", "inputs"));
  const initialWacc = toNum(getPageInputValue("initialWacc", "fetchedInputs"));
  const totalEquity = toNum(getPageInputValue("totalEquity", "fetchedInputs"));
  const totalDebt = toNum(getPageInputValue("totalDebt", "fetchedInputs"));
  const debtToCapital =
    totalDebt != null && totalEquity != null && totalDebt + totalEquity !== 0
      ? parseFloat((totalDebt / (totalDebt + totalEquity)).toFixed(4))
      : null;

  // ── Loading / Error states ──
  const isLoading = inputStatsLoading || industryUSLoading || industryGlobalLoading;
  const allFailed = !!inputStatsError && !!industryUSError && !!industryGlobalError;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div ref={popoutRef} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-11/12 h-5/6 overflow-auto">
          <div className="flex justify-center items-center h-full gap-3">
            <Spinner size={10} />
            <span className="text-gray-500 text-sm">Loading industry data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (allFailed) {
    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div ref={popoutRef} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-11/12 h-5/6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Market Insight</h2>
            <button onClick={() => setIsPopoutOpen(false)} className="text-gray-400 hover:text-gray-700">
              <RxCross1 size={22} />
            </button>
          </div>
          <div className="text-center mt-16 space-y-4">
            <p className="text-red-500 font-medium">Failed to load industry data. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 px-5 py-2 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Metric section data ──
  const revenueGrowthSection = {
    title: "Revenue Growth",
    companyValues: [
      { label: "Year 1", value: revGrowthYr1 },
      { label: "Year 2–5", value: revGrowthYr2to5 },
    ],
    industryUS: toPct(industryUS?.revenue_growth_rate_5y),
    industryGlobal: toPct(industryGlobal?.revenue_growth_rate_5y),
    q1: inputStats?.revenue_growth_rate_first_quartile ?? null,
    median: inputStats?.revenue_growth_rate_median ?? null,
    q3: inputStats?.revenue_growth_rate_third_quartile ?? null,
    isPercent: true,
    primaryCompanyValue: revGrowthYr1,
  };

  const operatingMarginSection = {
    title: "Operating Margin",
    companyValues: [
      { label: "Year 1", value: opMarginYr1 },
      { label: "Year 10", value: opMarginYr10 },
    ],
    industryUS: toPct(industryUS?.pretax_operating_margin),
    industryGlobal: toPct(industryGlobal?.pretax_operating_margin),
    q1: inputStats?.pre_tax_operating_margin_first_quartile ?? null,
    median: inputStats?.pre_tax_operating_margin_median ?? null,
    q3: inputStats?.pre_tax_operating_margin_third_quartile ?? null,
    isPercent: true,
    primaryCompanyValue: opMarginYr10,
  };

  const salesToCapSection = {
    title: "Sales to Capital",
    companyValues: [
      { label: "Year 1", value: salesToCapYr1 },
      { label: "Year 2–5", value: salesToCapYr2to5 },
      { label: "Year 6–10", value: salesToCapYr6to10 },
    ],
    industryUS: industryUS?.sales_to_capital ?? null,
    industryGlobal: industryGlobal?.sales_to_capital ?? null,
    q1: inputStats?.sales_to_invested_capital_first_quartile ?? null,
    median: inputStats?.sales_to_invested_capital_median ?? null,
    q3: inputStats?.sales_to_invested_capital_third_quartile ?? null,
    isPercent: false,
    primaryCompanyValue: salesToCapYr1,
  };

  const waccSection = {
    title: "WACC (Cost of Capital)",
    companyValues: [{ label: "Initial WACC", value: initialWacc }],
    industryUS: toPct(industryUS?.cost_of_capital),
    industryGlobal: toPct(industryGlobal?.cost_of_capital),
    q1: inputStats?.cost_of_capital_first_quartile ?? null,
    median: inputStats?.cost_of_capital_median ?? null,
    q3: inputStats?.cost_of_capital_third_quartile ?? null,
    isPercent: true,
    primaryCompanyValue: initialWacc,
  };

  // debtToCapital is a decimal fraction (e.g. 0.35); industry/distribution stats are ×100 (e.g. 35)
  const debtToCapPct = debtToCapital != null ? parseFloat((debtToCapital * 100).toFixed(2)) : null;

  const debtToCapSection = {
    title: "Debt to Capital",
    companyValues: [{ label: "D / (D+E)", value: debtToCapPct }],
    industryUS: toPct(industryUS?.market_debt_to_capital),
    industryGlobal: toPct(industryGlobal?.market_debt_to_capital),
    q1: inputStats?.debt_to_capital_ratio_first_quartile ?? null,
    median: inputStats?.debt_to_capital_ratio_median ?? null,
    q3: inputStats?.debt_to_capital_ratio_third_quartile ?? null,
    isPercent: true,
    primaryCompanyValue: debtToCapPct,
  };

  // ROIC — US + Global, no distribution data
  const roicUS = toPct(industryUS?.aftertax_roc);
  const reinvestUS = toPct(industryUS?.reinvestment_rate);
  const roicGlobal = toPct(industryGlobal?.aftertax_roc);
  const reinvestGlobal = toPct(industryGlobal?.reinvestment_rate);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div ref={popoutRef} className="bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-2xl w-11/12 h-5/6 overflow-auto">

        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-6 py-4 flex items-center justify-between rounded-t-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Insight</h2>
            {industries && (
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700">
                {industries}
              </span>
            )}
          </div>
          <button onClick={() => setIsPopoutOpen(false)} className="text-gray-400 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
            <RxCross1 size={20} />
          </button>
        </div>

        <div className="px-6 pb-8">

          {/* ── Partial error notice ── */}
          {(inputStatsError || industryUSError || industryGlobalError) && (
            <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-lg px-4 py-2">
              Some data sources are unavailable — showing partial results.
            </div>
          )}

          {/* ── Metric Sections Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
            <MetricSection {...revenueGrowthSection} />
            <MetricSection {...operatingMarginSection} />
            <MetricSection {...salesToCapSection} />
            <MetricSection {...waccSection} />
          </div>

          {/* ── Debt to Capital (full width) ── */}
          <MetricSection {...debtToCapSection} />

          {/* ── ROIC (US + Global) ── */}
          <div className="overflow-hidden rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 mt-6">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-5 py-3">
              <h3 className="text-sm font-semibold uppercase tracking-widest">Return on Invested Capital (ROIC)</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 px-5 py-4">
              {/* Column headers */}
              <div className="grid grid-cols-3 gap-3 mb-2">
                <div />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">US Industry</span>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">Global Industry</span>
              </div>
              {/* ROIC row */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide self-center">ROIC</span>
                <div className="flex flex-col items-center justify-center rounded-xl px-4 py-3 bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-lg font-bold font-mono text-blue-700 dark:text-blue-400">
                    {roicUS != null ? `${roicUS.toFixed(2)}%` : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700">
                  <span className="text-lg font-bold font-mono text-blue-700 dark:text-blue-400">
                    {roicGlobal != null ? `${roicGlobal.toFixed(2)}%` : "N/A"}
                  </span>
                </div>
              </div>
              {/* Reinvestment Rate row */}
              <div className="grid grid-cols-3 gap-3">
                <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide self-center">Reinvest. Rate</span>
                <div className="flex flex-col items-center justify-center rounded-xl px-4 py-3 bg-white dark:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-600">
                  <span className="text-lg font-bold font-mono text-blue-700 dark:text-blue-400">
                    {reinvestUS != null ? `${reinvestUS.toFixed(2)}%` : "N/A"}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700">
                  <span className="text-lg font-bold font-mono text-blue-700 dark:text-blue-400">
                    {reinvestGlobal != null ? `${reinvestGlobal.toFixed(2)}%` : "N/A"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">No distribution data available for ROIC</p>
            </div>
          </div>

          {/* ── Comp Analysis ── */}
          <div className="mt-12">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Comp Analysis</h3>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* Peer companies */}
            <div className="mb-6 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Suggested Peers</h4>
                <button
                  onClick={fetchPeers}
                  disabled={loadingPeers}
                  className="flex items-center text-xs bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 dark:text-gray-200"
                >
                  <IoReloadCircle className="h-3.5 w-3.5 mr-1.5" />
                  Refresh
                </button>
              </div>
              {loadingPeers ? (
                <div className="flex items-center justify-center py-4 gap-2">
                  <Spinner size={5} />
                  <span className="text-gray-500 text-xs">Loading peers...</span>
                </div>
              ) : peerCompanies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {peerCompanies.map((peer, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center bg-gray-50 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg px-3 py-1.5 text-xs hover:shadow-sm transition-shadow"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-100">{peer}</span>
                      <button
                        onClick={() => copyToClipboard(peer)}
                        className="ml-2 text-gray-300 hover:text-gray-600 transition-colors"
                        title="Copy"
                      >
                        <MdContentCopy className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-2">No peers found for {symbol}</p>
              )}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Click ticker to copy, then paste below</p>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700 text-left">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase w-28">Ticker</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Company</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Revenue</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">EBIT</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">EBIT Margin</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">P/E</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">ROIC</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                  {compAnalysisRef.current.map((item, index) => (
                    <tr key={`${item.ticker}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-5 py-3 w-28">
                        <input
                          value={inputTickers[index] || ""}
                          onChange={(e) => {
                            const t = [...inputTickers];
                            t[index] = e.target.value;
                            setInputTickers(t);
                          }}
                          className="text-xs font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 w-full border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          placeholder="Ticker"
                        />
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{item.shortName || "—"}</td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200 font-mono">
                        {item.revenue ? `$${convToMillion(item.revenue)}` : "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200 font-mono">
                        {item.ebit ? `$${convToMillion(item.ebit)}` : "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200 font-mono">
                        {item.ebitMargin ? `${convRound2Dp(item.ebitMargin)}%` : "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200 font-mono">
                        {item.peRatio ? convRound2Dp(item.peRatio) : "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200 font-mono">
                        {item.roic ? `${convRound2Dp(item.roic)}%` : "—"}
                      </td>
                    </tr>
                  ))}

                  {/* Averages row */}
                  <tr className="bg-blue-50 dark:bg-blue-900/20 font-semibold">
                    <td className="px-5 py-3 text-xs text-gray-600 dark:text-gray-400 uppercase" colSpan={2}>Averages</td>
                    <td className="px-5 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">—</td>
                    <td className="px-5 py-3 text-sm font-mono text-gray-600 dark:text-gray-400">—</td>
                    <td className="px-5 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">
                      {averages.avgEbitMargin !== "N/A" ? `${averages.avgEbitMargin}%` : "—"}
                    </td>
                    <td className="px-5 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">
                      {averages.avgPeRatio !== "N/A" ? averages.avgPeRatio : "—"}
                    </td>
                    <td className="px-5 py-3 text-sm font-mono text-gray-800 dark:text-gray-200">
                      {averages.avgRoic !== "N/A" ? `${averages.avgRoic}%` : "—"}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Add row */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => {
                    compAnalysisRef.current.push({ ticker: "", shortName: "", revenue: 0, ebit: 0, ebitMargin: 0, peRatio: 0, roic: 0 });
                    setInputTickers([...inputTickers, ""]);
                    triggerReRender();
                  }}
                  className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Add Company
                </button>
              </div>
            </div>

            {/* Search button */}
            <div className="flex justify-center mt-6">
              <button
                disabled={isFetchingCompAnalysis}
                onClick={handleCompAnalysis}
                className="bg-blue-600 px-6 py-2.5 text-white rounded-xl hover:bg-blue-700 transition-colors min-w-[120px] flex items-center justify-center gap-2 text-sm font-medium shadow-sm disabled:opacity-60"
              >
                {isFetchingCompAnalysis ? (
                  <Spinner size={5} color="text-white" />
                ) : (
                  <>
                    <CiSearch className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketInsightPopoutPage;
