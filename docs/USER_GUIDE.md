# Investment Calculator User Guide

The calculator shows how savings may change over time based on an initial
balance, recurring contributions, an estimated return, and inflation.

> This tool provides an estimate only. Results are not guaranteed returns or
> financial advice. Taxes, fees, market volatility, and other real-world costs
> are not included.

## Quick Start

1. Select the currency used to format the results.
2. Enter the amount currently saved.
3. Choose monthly or yearly contributions and enter the contribution amount.
4. Enter the estimated annual return and compounding frequency.
5. Enter the estimated annual inflation rate and investment duration.
6. Select **Calculate projection**.

Change any value and calculate again to compare plans. Select **Reset** to
clear both the form and the current projection.

## Input Reference

| Field | Purpose | Accepted value |
| --- | --- | --- |
| Currency | Formats monetary results | USD, EUR, GBP, or TRY |
| Current Savings | Starting balance | Zero or greater |
| Contribution Frequency | Controls when contributions are added | Monthly or yearly |
| Contribution | Amount added at the end of each selected period | Zero or greater |
| Expected Return | Estimated nominal annual gain or loss | -100% to 100% |
| Compounding Frequency | Controls how often returns compound | Monthly or yearly |
| Expected Inflation | Adjusts the purchasing-power estimate | 0% to 100% |
| Investment Duration | Number of projected years | Whole number from 1 to 100 |

Monetary and percentage fields accept decimals such as `1250.50` or `6.75`.
The duration must be a whole number.

## Reading the Results

- **Year:** projection year.
- **Total Savings:** estimated end-of-year balance.
- **Interest (Year):** gain or loss generated during that year.
- **Total Interest:** cumulative gain or loss since the start.
- **Invested Capital:** initial savings plus contributions made to date.
- **Today's Money:** estimated purchasing power after inflation.

Summary cards show the final-year values. The growth chart compares nominal
balance, invested capital, and inflation-adjusted balance. On small screens,
the table scrolls horizontally while the year column remains visible.

## Example

Consider the following assumptions:

- initial savings: `$10,000`;
- yearly contribution: `$2,400`;
- estimated annual return: `7%`;
- yearly compounding;
- duration: `10 years`.

The projection assumes the same return in every period. Actual investment
returns vary and can be negative.

## Calculation Method

For each period, the calculator applies the selected return rate to the opening
balance and then adds the contribution at the end of the period. A new
contribution therefore begins earning a return in the following compounding
period.

For yearly compounding, the simplified calculation is:

```text
annual return = opening balance × return rate
closing balance = opening balance + annual return + annual contribution
```

The inflation-adjusted value converts each projected nominal balance into an
estimate of today's purchasing power.

## Validation

The form displays an inline message when:

- savings or contributions are negative;
- the return is outside -100% to 100%;
- inflation is outside 0% to 100%;
- duration is not a whole number from 1 to 100;
- a required field is empty.

Correct the value and select **Calculate projection** again.

## Privacy and Security

Calculations run entirely in the browser. Financial inputs are not sent to a
server or stored by the application. Refreshing the page or selecting
**Reset** clears the current calculation.

## Accessibility

The interface supports keyboard navigation. Use `Tab` to move between fields
and `Enter` or `Space` to activate controls. Validation messages are announced
to assistive technology, and the layout adapts to mobile, tablet, and desktop
screens.
