'''
Tests of functions:
 - getK
'''

import pytest
from football.trainer import getK

def test_get_K():
    k = getK("FIFA World Cup")
    assert k == 60

    k = getK("euro qualification")
    assert k == 40

    k = getK("uefa euro")
    assert k == 50

    k = getK("friendly")
    assert k == 20