/**
 * Generiert einen zufälligen Rabattcode
 * @param length Die Länge des zu generierenden Codes
 * @param prefix Ein optionales Präfix für den Code
 * @returns Ein zufällig generierter Rabattcode
 */
export const generateRandomCode = (length: number = 6, prefix: string = ''): string => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Keine verwirrenden Zeichen wie I, O, 0, 1
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return `${prefix}${result}`;
  };
  
  /**
   * Generiert ein Array von einzigartigen Rabattcodes
   * @param count Die Anzahl der zu generierenden Codes
   * @param length Die Länge jedes Codes
   * @param prefix Ein optionales Präfix für alle Codes
   * @returns Ein Array von einzigartigen Rabattcodes
   */
  export const generateDiscountCodes = (
    count: number,
    length: number = 6,
    prefix: string = ''
  ): string[] => {
    const codes = new Set<string>();
    
    // Generiere den aktiven Code
    const activeCode = generateRandomCode(length, prefix);
    codes.add(activeCode);
    
    // Generiere die restlichen einzigartigen Codes
    while (codes.size < count) {
      const code = generateRandomCode(length, prefix);
      codes.add(code);
    }
    
    return Array.from(codes);
  };
  
  /**
   * Wählt einen zufälligen Code aus dem Array aus
   * @param codes Ein Array von Rabattcodes
   * @returns Ein zufällig ausgewählter Code
   */
  export const selectRandomCode = (codes: string[]): string => {
    if (!codes.length) return '';
    
    const randomIndex = Math.floor(Math.random() * codes.length);
    return codes[randomIndex];
  };
  
  /**
   * Mische ein Array von Codes
   * @param codes Ein Array von Rabattcodes
   * @returns Ein gemischtes Array von Codes
   */
  export const shuffleCodes = (codes: string[]): string[] => {
    const shuffled = [...codes];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  };
  
  /**
   * Formatiert Sekunden in eine lesbare Countdown-Zeit (HH:MM:SS)
   * @param seconds Die Anzahl der Sekunden
   * @returns Ein formatierter Countdown-String
   */
  export const formatCountdown = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };