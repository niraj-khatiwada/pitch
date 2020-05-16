from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework.fields import ListField
from .. import models


class BankContactNumberArrayField(ListField):
    def to_representation(self, data):
        obj = super().to_representation(data)
        return ','.join([str(item) for item in obj])

    def to_internal_value(self, data):
        data = data.split(',')
        return super().to_internal_value(data)


class BankSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField(read_only=True)
    bank_contact_number = BankContactNumberArrayField()

    class Meta:
        model = models.Bank
        fields = '__all__'
        extra_fields = ('detail_url', 'bank_contact_number')
        read_only_fields = ('bank_central_hq_address',)

    def get_detail_url(self, instance):
        return reverse('bank-detail', kwargs={'pk': instance.id}, request=self.context.get('request'))


class BranchSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Branch
        fields = '__all__'
        extra_fields = ('detail_url',)
        read_only_fields = ('branch_address',)

    def get_detail_url(self, instance):
        return reverse('branch-detail', kwargs={'pk': instance.id}, request=self.context.get('request'))


class ATMSerializer(serializers.ModelSerializer):
    detail_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.ATM
        fields = '__all__'
        extra_fields = ('detail_url',)
        read_only_fields = ('atm_address',)

    def get_detail_url(self, instance):
        return reverse('atm-detail', kwargs={'pk': instance.id}, request=self.context.get('request'))


class AnnonATMSerializer(ATMSerializer):
    class Meta:
        model = models.AnonATM
        fields = '__all__'
        extra_fields = ('detail_url',)
        read_only_fields = ('atm_address',)
