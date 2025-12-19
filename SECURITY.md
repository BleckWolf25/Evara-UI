# Security Policy

We take the security of **Evara UI** seriously. We appreciate your efforts to responsibly disclose vulnerabilities, which helps us protect our users and maintain a secure ecosystem.

## Supported Versions

We provide security updates for the current major version. Users on older versions are encouraged to upgrade to the latest stable release.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

### Private Disclosure (Preferred)

The best way to report a vulnerability is through [GitHub's Private Vulnerability Reporting](https://github.com/BleckWolf25/Evara-UI/security/advisories/new). This provides a secure channel for us to triage and fix the issue before it is made public.

### Reporting Process

1. Submit your report privately via the link above.
2. Provide a clear description of the vulnerability, including steps to reproduce (PoC).
3. We will acknowledge your report within **48-106 hours**.
4. We will provide regular updates as we investigate and work on a fix.
5. Once the fix is released, a Security Advisory will be published, and you will be credited for the discovery (unless you prefer to remain anonymous).

## Vulnerability Handling

Evara UI follows a standard disclosure timeline. We aim to address critical vulnerabilities within **7-14 business days**. We ask that you give us a reasonable amount of time to resolve the issue before any public disclosure.

## Third-Party Dependencies

If you find a vulnerability in one of our dependencies, we recommend reporting it to the respective maintainers. However, if the dependency vulnerability is exploitable through Evara UI, please let us know so we can prioritize an update or mitigation.

## Security Best Practices

- Always use the latest version of Evara UI.
- Use `pnpm audit` regularly to check for known vulnerabilities in your project's dependency tree.
- Ensure proper input sanitization when passing dynamic data to components.

---

_Thank you for helping keep Evara UI secure!_
