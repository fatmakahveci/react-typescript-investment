# Investment Calculator User Guide

The calculator shows how your savings could change over time, year by year. Enter your starting savings, regular contribution, expected annual return, and investment duration.

> This tool provides an estimated projection, not guaranteed returns or financial advice. It excludes taxes, fees, and market fluctuations. Inflation-adjusted results estimate purchasing power using the inflation rate you enter.

## Quick start

1. Select your **Currency**.
2. Enter your starting balance in **Current savings**.
3. Choose monthly or yearly contributions and enter the contribution amount.
4. Enter the expected annual return and choose monthly or yearly compounding.
5. Enter expected annual inflation and the investment duration.
6. Click **Calculate projection**.

Change the values and calculate again to update the projection. Click **Reset** to clear the form and results.

## Input fields

| Field | Description | Accepted values |
| --- | --- | --- |
| Currency | Currency used to display results | USD, EUR, GBP, or TRY |
| Current savings | Starting investment balance | Zero or greater |
| Contribution frequency | How often you add money | Monthly or Yearly |
| Contribution | Amount added at the end of each contribution period | Zero or greater |
| Expected return (%, yearly) | Estimated annual nominal return or loss | -100 to 100 |
| Compounding frequency | How often returns compound | Monthly or Yearly |
| Expected inflation (%, yearly) | Annual rate used to estimate purchasing power | 0 to 100 |
| Investment duration (years) | Number of years in the projection | A whole number from 1 to 100 |

Savings, contributions, and rates accept decimal values, such as `1250.50` or `6.75`. Duration must be a whole number.

## Reading the results

Summary cards show the final balance, invested capital, total return, and inflation-adjusted balance. Scenario comparison shows the same plan with annual returns two percentage points below and above your expected return, bounded to the accepted range. The growth chart compares nominal balance, invested capital, and purchasing power.

The yearly table contains:

- **Year:** The investment year.
- **Total Savings:** Estimated balance at the end of that year.
- **Interest (Year):** Return or loss for that year alone.
- **Total Interest:** Cumulative return or loss.
- **Invested Capital:** Starting savings plus all contributions to date.
- **Today's money:** The nominal balance adjusted for expected inflation.

On smaller screens, scroll the table horizontally to see all columns. The year column stays visible.

## Example calculation

Use these inputs:

- Starting savings: `$10,000`
- Yearly contribution: `$2,400`
- Contribution frequency: `Yearly`
- Expected annual return: `7%`
- Compounding frequency: `Yearly`
- Inflation: `0%`
- Duration: `10 years`

At the end of year 10, the estimated balance is **$52,830.99**, invested capital is **$34,000.00**, and total return is **$18,830.99**.

This example assumes a constant annual return. Actual investment returns can vary each year.

## Calculation method

For each period, the calculator applies the relevant return rate to the opening balance, adds the return, and adds any contribution due at the end of the period. New contributions begin earning returns in subsequent periods.

For yearly contributions and yearly compounding:

```text
Annual return = Opening balance × Annual return rate
Closing balance = Opening balance + Annual return + Annual contribution
```

Inflation-adjusted balances divide the nominal year-end balance by the cumulative inflation factor to estimate today's purchasing power.

## Exporting and sharing

- **Download CSV** exports the yearly results.
- **Print / Save PDF** opens the browser's print dialog.
- **Copy share link** creates a URL containing the projection inputs. Opening it restores the calculation in English.

## Validation messages

All input fields are required. Savings and contributions must be nonnegative, expected return must be between -100% and 100%, inflation must be between 0% and 100%, and duration must be a whole number from 1 to 100. Correct invalid values and click **Calculate projection** again.

## Privacy

Calculations run in your browser. Shared links include the financial inputs in their URL, so anyone with the link can see those inputs. Reloading an ordinary page clears the calculation; reloading a shared link restores its inputs. **Reset** clears the current form and results but does not remove parameters from a shared URL.

## Accessibility

Use `Tab` to move between fields and `Enter` or `Space` to activate buttons. Validation errors are announced to screen readers. The interface supports mobile, tablet, and desktop screens.
