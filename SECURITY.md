# Security Policy

## Supported Versions

| Version | Status | Security Updates |
| ------- | ------ | ---------------- |
| **2.0.x** | **Active (Enterprise)** | :white_check_mark: |
| 1.x     | Legacy | :x:                |

## Reporting a Vulnerability

**HackerX AEGIS** is a high-fidelity simulation platform. However, we maintain strict code quality standards.

If you discover a vulnerability in the core engine:

1.  **Do NOT open a GitHub Issue.**
2.  Email `security@hackerx.org` (Simulated).
3.  We will acknowledge receipt within 24 hours.

### In Scope for Bounty Program
- **Command Injection**: Unsafe argument passing in `tool.execute()`.
- **Buffer Overflow**: Crashes caused by malformed input in `ConsoleManager`.
- **Privilege Escalation**: Bypass of `ParentalControl` logic.

### Out of Scope
- Simulated "malware" samples (they are inert by design).
- Social engineering of the AI Assistant.

## Ethical Usage Agreement

By booting **AEGIS OS**, you agree to:
1.  **Authorization**: Only scan assets you own or have explicit permission to test.
2.  **Privacy**: Respect user data privacy during forensic analysis.
3.  **Educational Intent**: Use this platform to learn and defend, not to attack.

_HackerX Organization_
