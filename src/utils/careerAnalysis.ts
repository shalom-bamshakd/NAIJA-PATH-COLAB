// src/utils/careerAnalysis.ts

// Define a type (optional but good practice in TypeScript)
export type CareerAnalysisError = {
  code: string;
  message: string;
  providerLimitHit: boolean;
  isRetryable: boolean;
};

// Export the object as a constant
export const careerAnalysisError: CareerAnalysisError = {
  code: "rate-limited",
  message: "You have hit the rate limit. Please upgrade to keep chatting.",
  providerLimitHit: false,
  isRetryable: true,
};
