const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const teams = {
    FWC: range(1, 20),
    CC:  range(1, 12),

    ALG: range(1, 20),
    ARG: range(1, 20),
    AUS: range(1, 20),
    AUT: range(1, 20),

    BEL: range(1, 20),
    BIH: range(1, 20),
    BRA: range(1, 20),

    CAN: range(1, 20),
    CIV: range(1, 20),
    CHI: range(1, 20),
    COD: range(1, 20),
    CRO: range(1, 20),
    COL: range(1, 20),
    CZE: range(1, 20),

    ECU: range(1, 20),
    EGY: range(1, 20),
    ENG: range(1, 20),
    ESP: range(1, 20),
    
    FRA: range(1, 20),
    
    GER: range(1, 20),
    GHA: range(1, 20),
    
    HAI: range(1, 20),

    IRN: range(1, 20),
    IRQ: range(1, 20),
    
    JAM: range(1, 20),
    JOR: range(1, 20),
    JPN: range(1, 20),
    
    KOR: range(1, 20),
    KSA: range(1, 20),
    
    MAR: range(1, 20),
    MEX: range(1, 20),
    
    NED: range(1, 20),
    NOR: range(1, 20),
    NZL: range(1, 20),

    PAN: range(1, 20),
    PAR: range(1, 20),
    PER: range(1, 20),
    POR: range(1, 20),
    
    RSA: range(1, 20),
    
    SCO: range(1, 20),
    SEN: range(1, 20),
    SUI: range(1, 20),
    SWE: range(1, 20),
    
    TUN: range(1, 20),
    TUR: range(1, 20),
    
    QAT: range(1, 20),
    
    URU: range(1, 20),
    USA: range(1, 20),
    UZB: range(1, 20),
};