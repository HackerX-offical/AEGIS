# HX Security Intelligence CLI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Status](https://img.shields.io/badge/status-Legacy%20Stable-green.svg)

> **Corporate Security Utility** | **HackerX Organization** | **Author: SURYANSHU NABHEET**

## 1. Project Philosophy

The **HX Security Intelligence CLI** is a legacy-grade, enterprise-focused educational tool designed to demystify security concepts. Unlike aggressive "red team" tools, this project focuses purely on **defensive intelligence** and **mathematical modeling**.

It operates on the principle of **Ethical Security Intelligence**:

1.  **No Exploitation**: The tool never executes attacks against external targets.
2.  **No Brute-Force**: Crack times are calculated mathematically, not primarily via CPU/GPU grinding.
3.  **Educational First**: Every output is designed to teach the user _why_ a vulnerability exists.

## 2. Architecture

The system follows a strict **Dependency Inversion** architecture to ensure maintainability and testability.

```ascii
+-------------------+       +-------------------+
|   CLI Interface   | <---> |   Configuration   |
| (Args / Interactive)|       |     (Singleton)   |
+---------+---------+       +---------+---------+
          |                           |
          v                           v
+-------------------+       +-------------------+
|  Security Engine  | <---> |    Logger & Core  |
| (Entropy, Risk...) |       |      Services     |
+---------+---------+       +-------------------+
          |
          v
+-------------------+
|   Domain Models   |
|  (Types/Schemas)  |
+-------------------+
```

## 3. Features & How It Works

### Password Entropy Engine

Calculates the **Shannon Entropy** of a given string.

- **Formula**: `H = -sum(p_i * log2(p_i))`
- **Use Case**: Determines the raw mathematical randomness of a password, independent of dictionary attacks.

### Crack-Time Modeling

Estimates time-to-crack using **2024 GPU Hash Rates** (e.g., RTX 4090 baseline).

- **Throttled**: Online attacks restricted by valid rate limits (e.g., 100/hour).
- **Fast Hash**: Offline attacks against unsalted MD5 (10 Billion/sec).

### Input Risk Classification

Uses **Regex Pattern Matching** to identify unsafe characters.

- **SQLi**: Detects quotes, comments, union operators.
- **XSS**: Detects script tags, event handlers.
- **Note**: This is a _static analysis_ simulation, not a dynamic WAF.

### Hashing Lab

Demonstrates the critical difference between `MD5`, `SHA-256`, and `PBKDF2`.

- Shows how **Salt** changes the hash output completely, defeating rainbow tables.

## 4. Usage

### Quick Analysis

```bash
./bin/hx-sec analyze --target "supersecretPassword123!"
```

### Interactive Mode

```bash
./bin/hx-sec interactive
```

Enter the shell to run multiple analyses in a session.

### JSON Output (Integration)

```bash
./bin/hx-sec analyze --target "admin" --json
```

## 5. Development

### Prerequisites

- Node.js v18+
- TypeScript v4.x+

### Setup

```bash
npm install
npm run build
```

## 6. Ethical Boundaries

This tool is strictly **DEFENSIVE**.

- It **DOES NOT** store passwords.
- It **DOES NOT** send data to the cloud.
- It **DOES NOT** attempt to log into services.

---

© 2025 HackerX Organization. All Rights Reserved.
