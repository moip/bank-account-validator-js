(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function SantanderValidator() {
    if ( !( this instanceof SantanderValidator ) ) {
      return new SantanderValidator();
    }
  }

  SantanderValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return agencyCheckNumber === undefined || agencyCheckNumber === "";
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == this.accountNumberLength() && 
        Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      return true;
    },
    
    accountCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.SantanderCheckNumberCalculator.calculateAccount(bankAccount.agencyNumber,bankAccount.accountNumber);
      return checkNumberCalculated === bankAccount.accountCheckNumber.toUpperCase();
    },

    agencyNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyNumberMsgError();
    },

    agencyCheckNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyCheckNumberMsgError();
    },

    accountNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.accountNumberMsgError(this.accountNumberLength());
    },

    accountNumberLength: function() { return 8; }

  };

  Moip.SantanderValidator = SantanderValidator();

})(window);